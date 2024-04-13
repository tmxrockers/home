WITH RankedData AS (
    SELECT 
        REPORT_DATE,
        DSCRPTN,
        UPLOAD_VERSION,
        ROW_NUMBER() OVER (PARTITION BY REPORT_DATE ORDER BY UPLOAD_DATE DESC) AS rn
    FROM finance_ref_master_data
    WHERE DSCRPTN = 'Current Forecast'
)
SELECT 
    REPORT_DATE,
    UPLOAD_DATE,
    UPLOAD_VERSION,
    DSCRPTN
FROM finance_ref_master_data
WHERE DSCRPTN = 'Current Forecast'
OR (REPORT_DATE, UPLOAD_VERSION) IN (
    SELECT REPORT_DATE, UPLOAD_VERSION
    FROM RankedData
    WHERE rn = 1
)
ORDER BY REPORT_DATE DESC, UPLOAD_VERSION DESC;



WITH QuarterRanking AS (
    SELECT 
        REPORT_DATE, 
        DSCRPTN,
        CASE 
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '0+12' THEN 1
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '4+8' THEN 2
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '7+5' THEN 3
            WHEN DSCRPTN = 'Current Forecast' AND ABBERVTIN = '10+2' THEN 4
            ELSE 0
        END AS QuarterRank
    FROM finance_ref_master_data
)
SELECT 
    REPORT_DATE, 
    MAX(UPLOAD_DATE) AS MAX_UPLOAD_DATE,
    QuarterRank
FROM QuarterRanking
GROUP BY REPORT_DATE, QuarterRank
ORDER BY REPORT_DATE DESC, QuarterRank ASC;
