import { editorTags } from '../constants/data'

function EditorsPick() {
  return (
    <section className="editors-pick-section" id="editors-pick">
      <div className="editors-pick__heading">
        <span className="section-icon" aria-hidden="true" />
        <h2>Editor&apos;s pick</h2>
      </div>

      <div className="editors-pick__layout">
        <div className="editors-pick__media">
          <img
            src="/editors-pick.png"
            alt="Featured editorial story"
            className="editors-pick__image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <article className="editors-pick__content">
          <span className="editors-pick__location">Singapore</span>
          <h3>Article title max 2 liners than truncate goes here</h3>
          <div className="editors-pick__tags">
            {editorTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a href="/" className="editors-pick__link">
            Read more
          </a>
        </article>
      </div>
    </section>
  )
}

export default EditorsPick
