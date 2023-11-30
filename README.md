# NSFW API

本项目基于 [arnidan/nsfw-api](https://github.com/arnidan/nsfw-api) 进行复刻。在原项目的基础上，新增了支持跨域请求的功能。

使用方法保持不变，与原项目相同。

新的Docker运行指令如下所示：

```
docker run -p 3000:3000 ghcr.io/cr-zhichen/nsfw-api:latest
```

```
docker run -p 3000:3000 ghcr.io/cr-zhichen/nsfw-api:latest-min
```

----

[![build](https://github.com/arnidan/nsfw-api/actions/workflows/build.yml/badge.svg)](https://github.com/arnidan/nsfw-api/actions/workflows/build.yml)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

围绕 [NSFWJS](https://github.com/infinitered/nsfwjs) 提供API的封装。

## 使用方法

### Docker

有两个与 [NSFW模型v3](https://github.com/gantman/nsfw_model) 打包在一起的Docker镜像：

* `ghcr.io/arnidan/nsfw-api:latest` - 打包了TensorflowJS 299x299图像模型（检测效果更好）
* `ghcr.io/arnidan/nsfw-api:latest-min` - 打包了TensorflowJS量化299x299图像模型（参见 [#39](https://github.com/arnidan/nsfw-api/issues/49)）

每个镜像都支持 `linux/amd64` 和 `linux/arm64` 平台。

```
docker run -p 3000:3000 ghcr.io/arnidan/nsfw-api:latest
```

<details>
    <summary>docker-compose.yml 示例</summary>

```yaml
version: "3.9"

services:
  nsfw-api:
    image: "ghcr.io/arnidan/nsfw-api:latest"
    ports:
      - "3000:3000"
    restart: always
```

</details>

### 手动部署

1. 克隆仓库
2. 从 [模型仓库](https://github.com/gantman/nsfw_model) 下载并解压模型到 `model` 文件夹
3. 运行 `yarn`
4. 运行 `yarn build`
5. 运行 `yarn start`

现在应用在3000端口启动。

## API 方法

- POST /classify
- POST /classify-many

### POST /classify

#### 请求示例

```http request
POST /classify HTTP/1.1
Content-Type: multipart/form-data
```

图片应该在 `image` 字段中提供。

#### 响应示例

```
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
    "porn": 0.59248286485672,
    "sexy": 0.39802199602127075,
    "hentai": 0.006243097595870495,
    "neutral": 0.0031403270550072193,
    "drawing": 0.00011181648733327165
}
```

### POST /classify-many

#### 请求示例

```http request
POST /classify-many HTTP/1.1
Content-Type: multipart/form-data
```

图片应该在 `images` 字段中提供。

#### 响应示例

```
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
[
    {
        "porn": 0.3996206820011139,
        "neutral": 0.388679563999176,
        "sexy": 0.19470958411693573,
        "hentai": 0.015063910745084286,
        "drawing": 0.001926235854625702
    },
    {
        "sexy": 0.8366416692733765,
        "porn": 0.13645528256893158,
        "neutral": 0.0222245492041111,
        "hentai": 0.004213324282318354,
        "drawing": 0.0004651622730307281
    },
    {
        "sexy": 0.8017168045043945,
        "porn": 0.1770564466714859,
        "neutral": 0.015829339623451233,
        "hentai": 0.005097625777125359,
        "drawing": 0.00029983260901644826
    }
]
```
