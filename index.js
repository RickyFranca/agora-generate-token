const express = require('express');
const app = express();
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const agoraAppId = 'c828d3c5db8742a6bf25a73a49dc0e1a';
const agoraAppCertificate = '718d5e082d9c4eb68285c137839c027b';

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
