<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FlysoftBeta\ReCaptchaChina\Listeners;

use Flarum\Discussion\Event\Saving;
use FlysoftBeta\ReCaptchaChina\Validators\RecaptchaValidator;
use Illuminate\Support\Arr;

class StartDiscussionValidate
{
    /**
     * @var RecaptchaValidator
     */
    protected $validator;

    /**
     * @param RecaptchaValidator $validator
     */
    public function __construct(RecaptchaValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(Saving $event)
    {
        if (!$event->discussion->exists) {
            if ($event->actor->hasPermission('flysoft-beta-recaptcha-china.postWithoutCaptcha')) {
                return;
            }

            $this->validator->assertValid([
                'recaptcha' => Arr::get($event->data, 'attributes.g-recaptcha-response'),
            ]);
        }
    }
}
