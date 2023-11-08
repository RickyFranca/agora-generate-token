const express = require('express');
const app = express();
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
require('dotenv').config();

const agoraAppId = process.env.AGORA_APP_ID;
const agoraAppCertificate = process.env.AGORA_APP_CERTIFICATE;

app.get('/gerar-token', (req, res) => {
  const { channelName, uid } = req.query;

  if (!channelName || !uid) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    agoraAppId,
    agoraAppCertificate,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    privilegeExpiredTs
  );

  res.json({ token });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
