import React, { useState } from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';
import { useDoc } from '@docusaurus/theme-common/internal';
import { PositiveFeedbackIcon } from './PositiveFeedbackIcon';
import { NegativeFeedbackIcon } from './NegativeFeedbackIcon';

const THANKS_MESSAGE_DELAY = 1000;

const enum FeedbackStatus {
  Positive = 'like_btn',
  Negative = 'dislike_btn',
}

const enum SubmitStatus {
  Idle = 'idle',
  Submitted = 'submitted',
  Hidden = 'hidden',
}

const FeedbackSubmitted = ({ isHidden }: { isHidden: boolean }) => (
  <div
    className={clsx(
      'feedback-card max-w-md w-80 lg:w-auto py-3 rounded-lg my-5 bg-white px-4 flex h-[54px] mx-auto',
      {
        'transition-all opacity-0': isHidden,
      }
    )}
  >
    <span className="w-full font-bold text-primary text-sm me-4 leading-[inherit]">
      {translate({ id: 'feedback.thanks.widget', message: 'Спасибо за заполнение!' })}
    </span>
  </div>
);

export const Feedback = () => {
  const [submitStatus, setSubmittedStatus] = useState(SubmitStatus.Idle);

  const {
    metadata: { id, title },
  } = useDoc();

  const onSubmit = (feedbackValue: FeedbackStatus) => {
    setSubmittedStatus(SubmitStatus.Submitted);

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: {
        article_id: id,
        title,
        event_value: feedbackValue,
      },
      eventDate: Date.now(),
    });

    setTimeout(() => {
      setSubmittedStatus(SubmitStatus.Hidden);
    }, THANKS_MESSAGE_DELAY);
  };

  if (submitStatus !== SubmitStatus.Idle) {
    return <FeedbackSubmitted isHidden={submitStatus === SubmitStatus.Hidden} />;
  }

  return (
    <BrowserOnly>
      {() => (
        <div className="feedback-card max-w-[420px] w-80 lg:w-auto py-3 rounded-lg my-5 bg-white px-4 flex h-[54px] mx-auto">
          <span className="w-full font-bold text-primary text-sm me-4 leading-[inherit]">
            {translate({ id: 'feedback.question', message: 'Вы нашли ответ на свой вопрос?' })}
          </span>

          <div className="flex gap-1">
            <button
              className="secondary-button rounded-lg text-primary px-2 border-none hover:text-blue-600 gap-1"
              onClick={() => onSubmit(FeedbackStatus.Positive)}
              aria-label="Yes"
              type="button"
            >
              <PositiveFeedbackIcon />
              <span>{translate({ id: 'feedback.btn.positive', message: 'Да' })}</span>
            </button>

            <button
              className="secondary-button rounded-lg text-primary px-2 border-none hover:text-blue-600 gap-1"
              onClick={() => onSubmit(FeedbackStatus.Negative)}
              aria-label="No"
              type="button"
            >
              <NegativeFeedbackIcon />
              <span>{translate({ id: 'feedback.btn.negative', message: 'Нет' })}</span>
            </button>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
};
