import { Box, CircularProgress, Skeleton } from "@mui/material";
import styles from "./OnTimeLatePunch.module.css";
import { useEffect, useState } from "react";

const OnTimeLatePunch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className={styles.ontimeLatePunchDiv}>
      <div className={styles.onTimeMainDiv}>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={220}
              height={65}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: "220px",
              height: "65px",
              backgroundColor: "#E3FDF0",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#E3FDDF",
              },
              borderRadius: "10px",
              boxShadow: "5px 5px 5px #bdbdbd",
            }}
          >
            <div className={styles.contentMainDiv}>
              <CircularProgress
                variant="determinate"
                value={80}
                size={50}
                thickness={4}
                color="success"
              />
              <div
                className={styles.circularDiv}
                style={{ color: "green", transform: "translate(-50px)" }}
              >
                80%
              </div>
              <div>
                <h5 className={styles.headingDiv}>On Time</h5>
                <h6 className={styles.suHeadingOnTime}>8</h6>
              </div>
            </div>
          </Box>
        )}
      </div>
      <div className={styles.lateMainDiv}>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={220}
              height={65}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: "220px",
              height: "65px",
              backgroundColor: "#FFFFE4",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#FFFFD0",
              },
              borderRadius: "10px",
              boxShadow: "5px 5px 5px #bdbdbd",
            }}
          >
            <div className={styles.contentMainDiv}>
              <CircularProgress
                variant="determinate"
                value={20}
                size={50}
                thickness={4}
                color="warning"
              />
              <div
                className={styles.circularDiv}
                style={{ color: "goldenrod", transform: "translate(-38px)" }}
              >
                20%
              </div>
              <div>
                <h5 className={styles.headingDiv}>Late</h5>
                <h6 className={styles.suHeadinglate}>2</h6>
              </div>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};
export default OnTimeLatePunch;
