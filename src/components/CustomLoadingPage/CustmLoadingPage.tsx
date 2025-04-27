// @ts-ignore
import ErpIcon from "@/assets/svg/erp.icon.svg";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#fff",
      }}
    >
      <img
        src={ErpIcon}
        alt="Loading..."
        style={{
          width: "80px",
          height: "80px",
          animation: "spin 2s linear infinite",
        }}
      />
      <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
    </div>
  );
};

export default LoadingPage;
