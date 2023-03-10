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

use Flarum\Foundation\AbstractValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Validator;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\Post;

class AddValidatorRule
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(AbstractValidator $flarumValidator, Validator $validator)
    {
        $secret = $this->settings->get('flysoft-beta-recaptcha-china.credentials.secret');

        $validator->addExtension(
            'recaptcha',
            function ($attribute, $value, $parameters) use ($secret) {
                return !empty($value) && (new ReCaptcha($secret, new Post('https://www.recaptcha.net/recaptcha/api/siteverify')))->verify($value)->isSuccess();
            }
        );
    }
}
