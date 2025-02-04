import React, { useState } from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { PositiveFeedbackIcon, NegativeFeedbackIcon } from '../../ui/icons';
import { pushAnalytics } from '../../utils/analytics';
import { checkFeedbackAvailability } from './utils/checkFeedbackAvailability';

const THANKS_MESSAGE_DELAY = 1500;

const enum FeedbackStatus {
  Positive = 'like_btn',
  Negative = 'dislike_btn',
}

const enum SubmitStatus {
  Idle = 'idle',
  Submitted = 'submitted',
  Hidden = 'hidden',
}

interface FeedbackSubmittedProps {
  isHidden: boolean;
}

const FeedbackSubmitted = ({ isHidden }: FeedbackSubmittedProps) => (
  <div
    className={clsx(
      'feedback-card max-w-[420px] w-full lg:w-auto py-3 rounded-lg my-5 bg-white px-4 flex mx-auto sm:flex-row flex-col',
      {
        'transition-all opacity-0': isHidden,
      }
    )}
  >
    <div className="w-full font-bold text-primary text-sm me-4 leading-[inherit] min-h-[30px] flex items-center justify-center">
      {translate({ id: 'feedback.thanks.widget', message: 'Спасибо за заполнение!' })}
    </div>
  </div>
);

export const Feedback = () => {
  const [submitStatus, setSubmittedStatus] = useState(SubmitStatus.Idle);

  const {
    metadata: { id, title },
    frontMatter,
  } = useDoc();

  if (!checkFeedbackAvailability(id, frontMatter)) {
    return null;
  }

  const onSubmit = (feedbackValue: FeedbackStatus) => {
    setSubmittedStatus(SubmitStatus.Submitted);

    pushAnalytics({
      event: 'Docs-Article-SendReview',
      data: {
        article_id: id,
        title,
        event_value: feedbackValue,
        should_open_chat: feedbackValue === FeedbackStatus.Negative,
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
          <div className="w-full font-bold text-primary text-sm me-4 leading-[inherit] flex items-center sm:justify-start justify-center min-h-[30px]">
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
