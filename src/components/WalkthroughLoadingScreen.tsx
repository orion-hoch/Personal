import './WalkthroughLoadingScreen.css';

export default function WalkthroughLoadingScreen() {
  return (
    <div className="walkthrough-loading" aria-hidden>
      <div className="walkthrough-loading__panel">
        <div className="walkthrough-loading__label">Loading Walkthrough ...</div>
      </div>
    </div>
  );
}
