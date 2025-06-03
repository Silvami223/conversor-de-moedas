const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

const currencies = {
  USD: '🇺🇸 USD',
  EUR: '🇪🇺 EUR',
  BRL: '🇧🇷 BRL',
  GBP: '🇬🇧 GBP',
  JPY: '🇯🇵 JPY',
  AUD: '🇦🇺 AUD',
  CAD: '🇨🇦 CAD',
};

function populateCurrencySelectors() {
  for (const [code, label] of Object.entries(currencies)) {
    const option1 = new Option(label, code);
    const option2 = new Option(label, code);
    fromCurrency.add(option1);
    toCurrency.add(option2);
  }
  fromCurrency.value = 'USD';
  toCurrency.value = 'BRL';
}

async function fetchExchangeRate(from, to) {
  const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`);
  const data = await res.json();
  return data.result;
}

async function fetchHistoricalRates(from, to) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);
  const startStr = start.toISOString().split('T')[0];
  const endStr = end.toISOString().split('T')[0];

  const res = await fetch(`https://api.exchangerate.host/timeseries?start_date=${startStr}&end_date=${endStr}&base=${from}&symbols=${to}`);
  const data = await res.json();
  const labels = Object.keys(data.rates);
  const values = labels.map(date => data.rates[date][to]);
  return { labels, values };
}

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    resultDiv.textContent = 'Digite um valor válido.';
    return;
  }

  const rate = await fetchExchangeRate(from, to);

  if (!rate) {
    resultDiv.textContent = `Erro: Conversão de ${from} para ${to} indisponível.`;
    return;
  }

  const converted = (amount * rate).toFixed(2);
  resultDiv.textContent = `${currencies[from]} ${amount} = ${currencies[to]} ${converted}`;
  resultDiv.classList.add('animate__flash');

  const { labels, values } = await fetchHistoricalRates(from, to);
  renderChart(labels, values);
}


convertBtn.addEventListener('click', convertCurrency);
populateCurrencySelectors();
setLanguage(currentLanguage);
