import "./../../assets/styles/_loader.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        <div className="loader-circle"></div>

        <h2>NHDC CMS</h2>

        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
