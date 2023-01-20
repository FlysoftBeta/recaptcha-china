import app from 'flarum/admin/app';

app.initializers.add('flysoft-beta/recaptcha-china', () => {
  app.extensionData
    .for('flysoft-beta-recaptcha-china')
    .registerSetting({
      label: app.translator.trans('flysoft-beta-recaptcha-china.admin.settings.help_text', {
        a: <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener" />,
      }),
      type: 'hidden',
    })
    .registerSetting({
      setting: 'flysoft-beta-recaptcha-china.type',
      label: app.translator.trans('flysoft-beta-recaptcha-china.admin.settings.type_label'),
      options: {
        checkbox: 'Checkbox',
        invisible: 'Invisible',
      },
      required: true,
      default: 'checkbox',
      type: 'select',
    })
    .registerSetting({
      setting: 'flysoft-beta-recaptcha-china.credentials.site',
      label: app.translator.trans('flysoft-beta-recaptcha-china.admin.settings.site_key_label'),
      type: 'text',
      required: true,
    })
    .registerSetting({
      setting: 'flysoft-beta-recaptcha-china.credentials.secret',
      label: app.translator.trans('flysoft-beta-recaptcha-china.admin.settings.secret_key_label'),
      type: 'password',
      required: true,
    })
    .registerPermission(
      {
        permission: 'flysoft-beta-recaptcha-china.postWithoutCaptcha',
        label: app.translator.trans('flysoft-beta-recaptcha-china.admin.permissions.post_without_captcha'),
        icon: 'fas fa-robot',
      },
      'reply'
    );
});
