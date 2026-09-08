/**
 * 服务器全局配置模块(汉化注释说明)。
 * 汇总命令行参数与环境变量,解析出监听地址(hostname)、端口(port)、
 * SSL 证书/私钥/口令、是否启用 SSL 以及本地 WebSocket 地址等配置项。
 * 优先级:命令行参数 > UPTIME_KUMA_* 环境变量 > 通用环境变量 > 默认值(端口 3001)。
 */
const isFreeBSD = /^freebsd/.test(process.platform);

// 与浏览器环境互操作:在浏览器侧(无 process 对象)时参数为空对象
const args = typeof process !== "undefined" ? require("args-parser")(process.argv) : {};

// 若未指定 host,服务器将在 IPv6 可用时监听未指定地址 (::),否则监听 0.0.0.0。
// 支持双栈 (::)
// 非 FreeBSD 系统同时读取 HOST 环境变量;FreeBSD 中 HOST 是系统内置变量,故跳过
let hostEnv = isFreeBSD ? null : process.env.HOST;
const hostname = args.host || process.env.UPTIME_KUMA_HOST || hostEnv;

const port = [args.port, process.env.UPTIME_KUMA_PORT, process.env.PORT, 3001]
    .map((portValue) => parseInt(portValue))
    .find((portValue) => !isNaN(portValue));

const sslKey = args["ssl-key"] || process.env.UPTIME_KUMA_SSL_KEY || process.env.SSL_KEY || undefined;
const sslCert = args["ssl-cert"] || process.env.UPTIME_KUMA_SSL_CERT || process.env.SSL_CERT || undefined;
const sslKeyPassphrase =
    args["ssl-key-passphrase"] ||
    process.env.UPTIME_KUMA_SSL_KEY_PASSPHRASE ||
    process.env.SSL_KEY_PASSPHRASE ||
    undefined;

const isSSL = sslKey && sslCert;

/**
 * Get the local WebSocket URL
 * @returns {string} The local WebSocket URL
 */
function getLocalWebSocketURL() {
    const protocol = isSSL ? "wss" : "ws";
    const host = hostname || "localhost";
    return `${protocol}://${host}:${port}`;
}

const localWebSocketURL = getLocalWebSocketURL();

const demoMode = args["demo"] || false;

module.exports = {
    args,
    hostname,
    port,
    sslKey,
    sslCert,
    sslKeyPassphrase,
    isSSL,
    localWebSocketURL,
    demoMode,
};
