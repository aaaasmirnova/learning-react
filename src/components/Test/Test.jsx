import "./styles.css";
import { data } from "./data";
import { IoBookOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

export const Test = () => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const formatReach = (reach) => {
    if (reach >= 1000) {
      return `${(reach / 1000).toFixed(0)}K`;
    }
    return reach.toString();
  };

  const getTopTraffic = () => {
    if (!data.TRAFFIC || data.TRAFFIC.length === 0) return null;

    const sorted = [...data.TRAFFIC]
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return sorted.map((item, index) => (
      <span key={index}>
        {item.value} {Math.round(item.count * 100)}%
      </span>
    ));
  };

  const renderAuthors = () => {
    if (!data.AU || data.AU.length === 0) return null;

    return <>{data.AU.join(", ")}</>;
  };

  const renderKeywords = () => {
    if (!data.KW || data.KW.length === 0) return null;

    const sorted = [...data.KW].sort((a, b) => b.count - a.count);

    return (
      <div className="keywords">
        {sorted.map((kw, index) => (
          <span key={index} className="keyword-tag">
            {kw.value} {kw.count}
          </span>
        ))}
      </div>
    );
  };

  const addTagStrong = (text) => {
    return text.replace(/<kw>/g, "<strong>").replace(/<\/kw>/g, "</strong>");
  };

  return (
    <div className="news-snippet">
      <div className="news-header">
        <div className="news-meta">
          <span className="meta-item">{formatDate(data.DP)}</span>
          <span className="meta-item reach">
            {formatReach(data.REACH)} Reach
          </span>
          {data.TRAFFIC && data.TRAFFIC.length > 0 && (
            <span className="meta-item traffic">
              Top Traffic: {getTopTraffic()}
            </span>
          )}
          <span className="sent">{data.SENT}</span>
        </div>

        <h1 className="news-title">
          <a href={data.URL} target="_blank" rel="noopener noreferrer">
            {data.TI}
          </a>
        </h1>

        <div className="domain-info">
          <span className="icon">🌐</span> {data.DOM}
          <span className="country">🇫🇷 {data.CNTR}</span>
          <span className="language">
            <IoBookOutline />
            {data.LANG.toUpperCase()}
          </span>
          <div className="authors">
            {" "}
            <span className="icon">
              <IoPersonOutline />
            </span>{" "}
            {renderAuthors()}
          </div>
        </div>
      </div>

      <div className="news-content">
        {data.HIGHLIGHTS && data.HIGHLIGHTS.length > 0 ? (
          data.HIGHLIGHTS.map((highlight, index) => (
            <p key={index} className="highlight">
              <span
                dangerouslySetInnerHTML={{
                  __html: addTagStrong(highlight),
                }}
              />
            </p>
          ))
        ) : (
          <p>{data.AB}</p>
        )}
      </div>

      <div className="news-footer">
        <div className="tags-section">{renderKeywords()}</div>

        <div className="news-actions">
          <a href="#" className="original-source">
            Original Source
          </a>
          <span className="duplicates">Duplicates: 192</span>
        </div>

        <div className="news-footer-other">
          <div className="news-meta">
            <span className="meta-item">{formatDate(data.DP)}</span>
            <span className="meta-item reach">
              {formatReach(data.REACH)} Reach
            </span>
          </div>
          <h2 className="news-title">
            <a href={data.URL} target="_blank" rel="noopener noreferrer">
              {data.TI}
            </a>
          </h2>
          <div className="domain-info">
            <span className="icon">🌐</span> ria.ru
            <span className="country">🇫🇷 {data.CNTR}</span>
            <div className="authors-footer">
              {" "}
              <span className="icon">
                <IoPersonOutline />
              </span>{" "}
              {renderAuthors()}
            </div>
          </div>
        </div>
        <a className="view-dublicates">
          <IoIosArrowDown />
          View Dublicates
        </a>
      </div>
    </div>
  );
};
