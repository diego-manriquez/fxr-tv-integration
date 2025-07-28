# fxr-tv-integration

# 📦 FXR TradingView Enhancer

Este repositorio contiene un script que detecta automáticamente el `iframe` de TradingView embebido en una página web y permite extender sus funcionalidades, como la inyección de indicadores personalizados, creación de líneas, tracking, entre otros.

---

## ⚙️ Minificación del script

El archivo principal es `script.js`. Puedes minificarlo de las siguientes formas:

### ✅ Opción 1: Usando Terser (CLI)

1. Instala [Terser](https://github.com/terser/terser) de forma global:

```bash
npm install -g terser

terser script.js -o script.min.js --compress --mangle
