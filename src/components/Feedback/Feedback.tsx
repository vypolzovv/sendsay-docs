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
      'feedback-card max-w-md w-80 lg:w-auto py-3 rounded-lg my-5 bg-white px-4 flex mx-auto sm:flex-row flex-col',
      {
        'transition-all opacity-0': isHidden,
      }
    )}
  >
    <div className="w-full font-bold text-primary text-sm me-4 leading-[inherit]">
      {translate({ id: 'feedback.thanks.widget', message: 'Спасибо за заполнение!' })}
    </div>
  </div>
);

export const Feedback = () => {
  const [submitStatus, setSubmittedStatus] = useState(SubmitStatus.Idle);

  const {
    metadata: { id, title },
  } = useDoc();

  const onSubmit = (feedbackValue: FeedbackStatus) => {
    setSubmittedStatus(SubmitStatus.Submitted);

    window.dataLayer?.push?.({
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
        <div className="feedback-card max-w-[420px] w-full lg:w-auto py-3 rounded-lg my-5 bg-white px-4 flex mx-auto sm:flex-row flex-col items-center gap-y-2">
          <div className="w-full font-bold text-primary text-sm me-4 leading-[inherit] flex items-center">
            {translate({ id: 'feedback.question', message: 'Вы нашли ответ на свой вопрос?' })}
          </div>

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
