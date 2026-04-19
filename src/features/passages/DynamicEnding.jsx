import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveRouteForPassage } from '../../content/story-routing.config';
import { useVisitTracker } from '../tracking/VisitTrackerProvider';

function withName(text, name) {
  return text.replace('{NAME}', name ? `${name}, ` : '');
}

function EndingShell({ heading, status, body, recommendations, rating, name, total }) {
  const navigate = useNavigate();
  return (
    <div className="ending-panel">
      <div className="ending-status">{status}</div>
      <h2 className="ending-heading">{heading}</h2>
      {body.map((paragraph, i) => (
        <p key={i} className="ending-text">{withName(paragraph, name).replace('{COUNT}', String(total))}</p>
      ))}
      {recommendations && recommendations.length > 0 && (
        <div className="ending-recommendations">
          <p className="ending-rec-label">*recommended next steps:*</p>
          {recommendations.map((rec) => (
            <button
              key={rec.label}
              type="button"
              className="passage-choice"
              onClick={() => {
                if (rec.toPassage) {
                  navigate(resolveRouteForPassage(rec.toPassage));
                }
              }}
            >
              {rec.label}
            </button>
          ))}
        </div>
      )}
      <p className="ending-rating">{rating}</p>
    </div>
  );
}

export default function DynamicEnding() {
  const { totalVisited, playerName } = useVisitTracker();

  if (totalVisited <= 3) {
    return (
      <EndingShell
        status="*signal fading*"
        heading="The Scout"
        body={[
          'Well, {NAME}you came, you skimmed, you left. That is okay. Most people skim portifilios.',
          'You saw {COUNT} of 12 sections. If anything here caught your eye and you want to come back and dig deeper, I will be here.',
        ]}
        recommendations={[
          { label: 'My resume — the one-pager version', toPassage: 'resume-1' },
          { label: 'Tech Career — the quick career log', toPassage: 'tech-career-1' },
          { label: 'Contact Me — just say hi', toPassage: 'contact-me' },
          { label: 'Back to The Core if you are not done yet', toPassage: 'the-core' },
        ]}
        rating="*rating: the scout // you know enough to decide if you want to know more*"
        name={playerName}
        total={totalVisited}
      />
    );
  }

  if (totalVisited <= 8) {
    return (
      <EndingShell
        status="*transmission: solid connection*"
        heading="The Explorer"
        body={[
          '{NAME}you took the time. {COUNT} of 12 sections. That is more than most portfolios get from anyone, and I appreciate it.',
          'You have seen the work, the philosophy, and a fair slice of who I am outside the code. That is usually enough to know whether we would work well together. If you think we would, the next move is yours.',
        ]}
        recommendations={[
          { label: 'Contact me directly', toPassage: 'contact-me' },
          { label: 'Grab my resume', toPassage: 'resume-1' },
          { label: 'The last few sections — back to The Core', toPassage: 'the-core' },
        ]}
        rating="*rating: the explorer // you are paying real attention*"
        name={playerName}
        total={totalVisited}
      />
    );
  }

  return (
    <EndingShell
      status="*transmission: deep signal // full sync*"
      heading="The Completionist"
      body={[
        'Okay, {NAME}I have to say it. {COUNT} of 12 sections. You went through basically all of it.',
        'That is rare, and it tells me something. You are either a recruiter who does their homework, a fellow engineer who respects craft, or someone who genuinely wanted to know who I am. All three are the kind of people I want to work with.',
        'If you have read this far, email me. Seriously. Whatever the reason. I will read it and I will write back.',
        'joshuagarst@gmail.com',
      ]}
      recommendations={[
        { label: 'One more look at The Core', toPassage: 'the-core' },
        { label: 'Contact me directly', toPassage: 'contact-me' },
        { label: 'Grab my resume', toPassage: 'resume-1' },
      ]}
      rating="*rating: the completionist // you saw everything // signal clear*"
      name={playerName}
      total={totalVisited}
    />
  );
}
