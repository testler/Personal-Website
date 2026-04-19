import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import STORY_MAP, { DESTINATION_TO_PASSAGE } from '../../content/story-map.config';
import { resolvePassageForSlug, resolveRouteForPassage } from '../../content/story-routing.config';
import { useVisitTracker } from '../tracking/VisitTrackerProvider';
import PassageExtrasRenderer from './PassageExtras';
import DynamicEnding from './DynamicEnding';

const CoreHubScene = React.lazy(() => import('./CoreHubScene'));

import standingImg from '../../assets/standing_transparent_bg_Looking_left.webp';
import sittingFocusedImg from '../../assets/sitting_coding_not_looking_focused.webp';
import sittingWavingImg from '../../assets/sitting_coding_waving_and_smiling.webp';
import gamingImg from '../../assets/josh_gaming.webp';
import gardenImg from '../../assets/josh_garden.webp';
import makerImg from '../../assets/josh_maker.webp';
import familyImg from '../../assets/holiday_family.webp';
import careerGoalsImg from '../../assets/Career_Goals.webp';
import techListImg from '../../assets/tech_list.webp';
import faithImg from '../../assets/man_of_faith.webp';

import './PassageScene.css';

const STORY_PHOTOS = {
  press_start: standingImg,
  welcome_back: sittingWavingImg,
  opening_working: sittingFocusedImg,
  opening_gaming: gamingImg,
  smart_intro: sittingWavingImg,
  main_intro: standingImg,
  the_core: standingImg,
  projects: techListImg,
  approach: careerGoalsImg,
  website_reason: sittingWavingImg,
  personal_dossier: familyImg,
  tech_career: careerGoalsImg,
  nontech_career: gardenImg,
  my_stack: techListImg,
  my_contact: sittingWavingImg,
  linkedin: standingImg,
  github: makerImg,
  resume: sittingWavingImg,
  ending: faithImg,
};

const DEFAULT_PHOTO = standingImg;

function getTimeMode() {
  const hour = new Date().getHours();
  return hour >= 9 && hour < 18 ? 'working' : 'gaming';
}

function applySubstitutions(text, { name, timeMode }) {
  if (!text) return text;
  const safeName = name || '';
  const nameComma = safeName ? `, ${safeName}` : '';
  const typingSfx = timeMode === 'gaming' ? 'controller clicks and faint game audio' : 'keyboard typing sounds';
  return text
    .replace(/\$name/g, safeName)
    .replace(/\{NAME_COMMA\}/g, nameComma)
    .replace(/\{TIME_MODE\}/g, timeMode)
    .replace(/\{TYPING_SFX\}/g, typingSfx);
}

const SITE_TAGLINE = 'Joshua Garst — Full-Stack Software Engineer (.NET, C#, React) based in Northwest Arkansas. Interactive graphic-novel portfolio.';

function buildMetaDescription(passage, subs) {
  if (passage.metaDescription) return applySubstitutions(passage.metaDescription, subs);
  const paragraphs = (passage.paragraphs || [])
    .filter((p) => p != null && p !== '')
    .map((p) => applySubstitutions(p, subs))
    .map((p) => p.replace(/\*+/g, '').replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 10);
  let cleaned = paragraphs.join(' ');
  if (!cleaned && passage.prompt) {
    cleaned = applySubstitutions(passage.prompt, subs).replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
  }
  if (!cleaned) cleaned = SITE_TAGLINE;
  return cleaned.length > 160 ? `${cleaned.slice(0, 157).trim()}…` : cleaned;
}

export default function PassageScene() {
  const { passageSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    playerName,
    setPlayerName,
    resetPlayer,
    markDestinationVisited,
    isReturningVisitor,
    hasSignal,
    totalVisited,
    totalDestinations,
    visitedDestinations,
    getRandomUnvisited,
  } = useVisitTracker();

  const [nameDraft, setNameDraft] = useState('');
  const [timeMode] = useState(() => getTimeMode());
  const [nextSuggestion, setNextSuggestion] = useState(null);

  const { passageId, passage } = useMemo(() => {
    if (!passageSlug) {
      const id = isReturningVisitor ? 'welcome-back' : 'press-start';
      return { passageId: id, passage: STORY_MAP.nodes[id] };
    }
    const id = resolvePassageForSlug(passageSlug);
    return { passageId: id, passage: id ? STORY_MAP.nodes[id] : null };
  }, [passageSlug, isReturningVisitor]);

  useEffect(() => {
    if (!passage?.showNextDestination) {
      setNextSuggestion(null);
      return;
    }
    if (hasSignal) {
      setNextSuggestion({ label: 'follow the signal to the ending', toPassage: 'ending' });
      return;
    }
    const dest = getRandomUnvisited();
    if (!dest) {
      setNextSuggestion({ label: 'follow the signal to the ending', toPassage: 'ending' });
      return;
    }
    setNextSuggestion({
      label: `To ${dest}`,
      toPassage: DESTINATION_TO_PASSAGE[dest],
    });
  }, [passageId, passage, hasSignal, getRandomUnvisited]);

  useEffect(() => {
    if (passage?.visitKey) {
      markDestinationVisited(passage.visitKey);
    }
  }, [passageId, passage, markDestinationVisited]);

  useEffect(() => {
    setNameDraft('');
  }, [passageId]);

  const subs = { name: playerName, timeMode };

  const paragraphs = useMemo(() => {
    if (!passage) return [];
    const parts = [passage.prompt, ...(passage.paragraphs || [])];
    return parts.filter((p) => p != null && p !== '').map((p) => applySubstitutions(p, subs));
  }, [passage, playerName, timeMode]);

  const photoKey = useMemo(() => {
    if (!passage) return null;
    if (passage.photoKeyByTime) return passage.photoKeyByTime[timeMode];
    return passage.photoKey;
  }, [passage, timeMode]);
  const photoSrc = photoKey ? (STORY_PHOTOS[photoKey] || DEFAULT_PHOTO) : DEFAULT_PHOTO;

  const handleChoice = (choice) => {
    if (choice.resetPlayer) {
      resetPlayer();
    }

    if (choice.setName != null) {
      setPlayerName(choice.setName);
    }

    if (choice.toPassage) {
      navigate(resolveRouteForPassage(choice.toPassage));
      return;
    }

    if (choice.toRoute) {
      navigate(choice.toRoute);
      return;
    }

    if (choice.href) {
      if (choice.href.startsWith('mailto:') || choice.href.startsWith('tel:')) {
        window.location.href = choice.href;
        return;
      }
      window.open(choice.href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNameSubmit = (e) => {
    e?.preventDefault?.();
    const name = (nameDraft || '').trim();
    if (!name) return;
    setPlayerName(name);
    navigate(resolveRouteForPassage('main-intro-4'));
  };

  if (!passage) {
    return (
      <div className="passage-scene passage-scene-404">
        <div className="passage-dialogue-panel">
          <p className="passage-text">Signal lost. This route does not exist.</p>
          <button type="button" className="passage-choice" onClick={() => navigate('/')}>
            Return to Press Start
          </button>
        </div>
      </div>
    );
  }

  const isHome = location.pathname === '/';
  const helmetTitle = isHome
    ? 'Joshua Garst | Full-Stack Software Engineer Portfolio (.NET / React) — Northwest Arkansas'
    : `Joshua Garst | ${passage.title || passage.sceneLabel} — Full-Stack Software Engineer`;
  const canonicalUrl = `https://joshua-garst-portfolio-website.netlify.app${location.pathname}`;
  const description = buildMetaDescription(passage, subs);

  return (
    <div className={`passage-scene ${passage.isPressStart ? 'passage-scene--press-start' : ''} ${passage.isCoreHub ? 'passage-scene--core' : ''}`}>
      <Helmet>
        <title>{helmetTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={helmetTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={helmetTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <div className="passage-scanlines" />

      <div className="passage-scene-tag">{passage.sceneLabel}</div>

      {hasSignal && !passage.isEnding && !passage.isPressStart && (
        <button
          type="button"
          className="passage-signal-banner"
          onClick={() => navigate(resolveRouteForPassage('ending'))}
        >
          ⚠ SIGNAL DETECTED — follow it to the ending
        </button>
      )}

      <div className="passage-layout">
        <div className="passage-character-panel">
          <img
            src={photoSrc}
            alt="Joshua Garst"
            className="passage-character-img"
            width="1024"
            height="1536"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <div className="passage-dialogue-panel">
          <div className="passage-speaker-badge">
            {passage.isPressStart ? 'JOSHUA GARST // v1.0' : 'Joshua Garst'}
          </div>

          <div className="passage-text-area">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="passage-text">{paragraph}</p>
            ))}
          </div>

          {renderFinishedContent()}
        </div>
      </div>
    </div>
  );

  function renderFinishedContent() {
    if (passage.isEnding) {
      return <DynamicEnding />;
    }

    if (passage.isCoreHub) {
      return (
        <Suspense fallback={<div className="loading">Loading The Core…</div>}>
          <CoreHubScene
            visitedIds={visitedDestinations}
            totalVisited={totalVisited}
            totalDestinations={totalDestinations}
            hasSignal={hasSignal}
            onFollowSignal={() => handleChoice({ toPassage: 'ending' })}
            onFaceConfirm={(face) => handleChoice({ toPassage: face.toPassage })}
          />
        </Suspense>
      );
    }

    return (
      <>
        <PassageExtrasRenderer passageId={passageId} />

        {passage.nameInput && (
          <form className="passage-name-input" onSubmit={handleNameSubmit}>
            <input
              type="text"
              className="passage-name-field"
              placeholder="Or type your own (Player 2)"
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              maxLength={32}
            />
            <button type="submit" className="passage-choice passage-name-submit">
              Continue
            </button>
          </form>
        )}

        {passage.choices && passage.choices.length > 0 && (
          <div className="passage-choices">
            {passage.choices.map((choice) => (
              <button
                key={choice.label}
                type="button"
                className="passage-choice"
                onClick={() => handleChoice(choice)}
              >
                {applySubstitutions(choice.label, subs)}
              </button>
            ))}
          </div>
        )}

        {nextSuggestion && (
          <div className="passage-next-destination">
            <button
              type="button"
              className="passage-choice passage-next-destination-btn"
              onClick={() => handleChoice({ toPassage: nextSuggestion.toPassage })}
            >
              ➜ {nextSuggestion.label}
            </button>
          </div>
        )}
      </>
    );
  }
}
