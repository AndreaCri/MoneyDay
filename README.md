# Bilancio

Webapp personale per tenere sotto controllo spese, conti, spese fisse e previsioni.
Funziona offline e si installa sulla schermata Home del telefono.

## Pubblicarla su GitHub Pages

1. Su github.com crea un nuovo repository, per esempio `bilancio`, impostato come **Public**.
2. Nel repository tocca **Add file → Upload files** e trascina **tutti** i file di questa cartella,
   `index.html`, `react.js`, `manifest.json`, `sw.js` e le 4 immagini `.png` (nessuna cartella).
   Poi tocca **Commit changes**.
3. Vai in **Settings → Pages**. In *Branch* scegli `main` e la cartella `/ (root)`, poi tocca **Save**.
4. Dopo uno o due minuti l'app è online all'indirizzo
   `https://TUO-NOME-UTENTE.github.io/bilancio/`.

## Metterla sulla Home

- **iPhone (Safari):** apri il link, tocca il pulsante Condividi, poi **Aggiungi alla schermata Home**.
- **Android (Chrome):** apri il link, tocca il menu ⋮, poi **Installa app** (o **Aggiungi a schermata Home**).

## I dati

Spese e conti restano salvati **solo su quel telefono**, dentro l'app. Nessun server li riceve.
Ogni tanto vai in **Impostazioni → Copia di sicurezza → Scarica backup** e salva il file
(su iPhone puoi metterlo in File o su iCloud). Se cambi telefono, usa **Ripristina da file**.

## Aggiornare l'app

Se modifichi `index.html`, apri `sw.js` e cambia `bilancio-v2` in `bilancio-v3`,
poi carica di nuovo i file su GitHub. I dati salvati sul telefono non si perdono.
