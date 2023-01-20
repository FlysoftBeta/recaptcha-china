import { extend, override } from 'flarum/common/extend';
import RecaptchaState from './states/RecaptchaState';
import Recaptcha from './components/Recaptcha';

export default function (Composer) {
  const isInvisible = app.data['flysoft-beta-recaptcha-china.type'] === 'invisible';

  extend(Composer.prototype, 'oninit', function () {
    if (app.forum.attribute('postWithoutCaptcha')) {
      return;
    }

    this.recaptcha = new RecaptchaState(() => {
      if (isInvisible) {
        // onsubmit is usually called without any argument.
        // We use the first argument to indicate the second call after invisible recaptcha
        this.onsubmit('recaptchaSecondStep');
      }
    });
  });

  extend(Composer.prototype, 'data', function (data) {
    if (app.forum.attribute('postWithoutCaptcha')) {
      return;
    }

    data['g-recaptcha-response'] = this.recaptcha.getResponse();
  });

  extend(Composer.prototype, 'headerItems', function (fields) {
    if (app.forum.attribute('postWithoutCaptcha')) {
      return;
    }

    fields.add(
      'recaptcha',
      Recaptcha.component({
        state: this.recaptcha,
      }),
      -5
    );
  });

  // There's no onerror handler on composer classes, but we can react to loaded which is called after errors
  extend(Composer.prototype, 'loaded', function () {
    if (app.forum.attribute('postWithoutCaptcha')) {
      return;
    }

    this.recaptcha.reset();
  });

  override(Composer.prototype, 'onsubmit', function (original, argument1) {
    if (!app.forum.attribute('postWithoutCaptcha') && isInvisible && argument1 !== 'recaptchaSecondStep') {
      this.loading = true;
      this.recaptcha.execute();
      return;
    }

    return original();
  });
}
