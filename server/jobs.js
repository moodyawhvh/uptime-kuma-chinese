/**
 * 后台定时任务模块(汉化注释说明)。
 * 使用 croner 按服务器时区调度定时任务:
 * - clear-old-data:每日 03:14 清理旧的监控数据;
 * - incremental-vacuum:每 5 分钟对 SQLite 执行一次增量空间回收。
 */
const { UptimeKumaServer } = require("./uptime-kuma-server");
const { clearOldData } = require("./jobs/clear-old-data");
const { incrementalVacuum } = require("./jobs/incremental-vacuum");
const Cron = require("croner");

const jobs = [
    {
        name: "clear-old-data",
        interval: "14 03 * * *",
        jobFunc: clearOldData,
        croner: null,
    },
    {
        name: "incremental-vacuum",
        interval: "*/5 * * * *",
        jobFunc: incrementalVacuum,
        croner: null,
    },
];

/**
 * Initialize background jobs
 * @returns {Promise<void>}
 */
const initBackgroundJobs = async function () {
    const timezone = await UptimeKumaServer.getInstance().getTimezone();

    for (const job of jobs) {
        const cornerJob = new Cron(
            job.interval,
            {
                name: job.name,
                timezone,
            },
            job.jobFunc
        );
        job.croner = cornerJob;
    }
};

/**
 * Stop all background jobs if running
 * @returns {void}
 */
const stopBackgroundJobs = function () {
    for (const job of jobs) {
        if (job.croner) {
            job.croner.stop();
            job.croner = null;
        }
    }
};

module.exports = {
    initBackgroundJobs,
    stopBackgroundJobs,
};
