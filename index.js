const upyun = require('upyun');
const baseUploader = require('mongoose-uploader/lib/baseUploader');

const createUpyunUploader = (config) => {
  const client = new upyun.Client(
    config.service,
    config.operatorName,
    config.operatorPassword,
    {
      domain: config.domain,
      protocol: config.protocol
    }
  );
  const host = () => {

  };
  const upload = async function (upload) {
    const { stream, filename, mimetype, encoding } = await upload;
    const newFileName = this.filename(filename);
    const result = await client.putFile(newFileName, stream);
    return {
      url: host() + '/' + newFileName,
      filename: newFileName,
      mimetype,
      encoding
    };
  };
  const remove = async function (file) {
    await client.deleteFile(file.filename);
  };
  return Object.assign({}, baseUploader, { upload, remove });
};

module.exports = { createUpyunUploader };
