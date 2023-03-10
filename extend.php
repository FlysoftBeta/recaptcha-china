<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FlysoftBeta\ReCaptchaChina;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Extend;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\User\Event\Saving as UserSaving;
use FlysoftBeta\ReCaptchaChina\Listeners\AddValidatorRule;
use FlysoftBeta\ReCaptchaChina\Validators\RecaptchaValidator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->content(Content\ExtensionSettings::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Settings())
        ->serializeToForum('darkMode', 'theme_dark_mode', 'boolVal'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attribute('postWithoutCaptcha', function (ForumSerializer $serializer) {
            return $serializer->getActor()->hasPermission('flysoft-beta-recaptcha-china.postWithoutCaptcha');
        }),

    (new Extend\Validator(RecaptchaValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Event())
        ->listen(UserSaving::class, Listeners\RegisterValidate::class)
        ->listen(DiscussionSaving::class, Listeners\StartDiscussionValidate::class)
        ->listen(PostSaving::class, Listeners\ReplyPostValidate::class),
];
