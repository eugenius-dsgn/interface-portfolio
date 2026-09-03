/*Display swap script*/

const introductionDisplay = document.querySelector('#introduction-display');
const tabList = document.querySelector('.tablist');
const tabs = tabList.querySelectorAll('.tab');

const displayTexts = {
  hr: '5-й год делаю интерфейсы в\u00a0студийных командах с\u00a0продуктовым подходом. Сделал дизайн 20\u00a0мобильных и\u00a06\u00a0веб-приложений в\u00a0сферах интернета вещей, производства окон, логистики, телекома, образования и\u00a0цифровых публикаций',
  'design-lead': 'Ищу первоисточник задачи, уточняю детали, работаю итерациями и проверяю решения с помощью интерактивных прототипов в\u00a0ProtoPie. Впитываю опыт и знания команды, а также делюсь своими, чтобы быть вовлечённым и получать удовольствие от работы. Применяю гайды. Чистюля в\u00a0Figma. Дизайню сайты на\u00a0HTML, CSS, JS',
  'head-manager': 'Взаимодействую с\u00a0разработчиками, чтобы найти решение, которое выполняет задачу, воплотимо и\u00a0укладывается в\u00a0бюджет. Контролирую реализацию вместе с\u00a0аналитиками и\u00a0QA, чтобы обеспечить высокое качество продукта'
};

const selectTab = function(selectedTab) {
  tabs.forEach(function(tab) {
    const isSelected = tab === selectedTab;
    tab.classList.toggle('selected', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
  });
  introductionDisplay.textContent = displayTexts[selectedTab.id];
}

/*Set the initial state for display*/
selectTab(tabList.querySelector('[aria-selected="true"]') || tabs[0]);

tabList.addEventListener('click', function(event) {
  const selectedTab = event.target.closest('.tab');

  if (!selectedTab || !tabList.contains(selectedTab)) {
    return;
  }

  selectTab(selectedTab);
});


/*Experience date period calc*/

const icerockExpDatePeriods = document.querySelectorAll ('#icerock-dev .experience-date-period');
const atfExpDatePeriod = document.querySelector ('#alien-tech-fusion .experience-date-period');
const dylExpDatePeriod = document.querySelector ('#design-your-life .experience-date-period');

const MonthsRuLocale = [
  'Январь', 
  'Февраль', 
  'Март', 
  'Апрель', 
  'Май', 
  'Июнь',
  'Июль', 
  'Август', 
  'Сентябрь', 
  'Октябрь', 
  'Ноябрь', 
  'Декабрь'
];

const currentDate = new Date();

const expDatePeriods = [
  {
    company: "icerockDevLast",
    startDate: new Date(2024,10,1),
    endDate: currentDate
  },
  {
    company: "icerockDevFirst",
    startDate: new Date(2022,3,1),
    endDate: new Date(2024,10,1)
  },
  {
    company: "alientTechFusion",
    startDate: new Date(2024,3,1),
    endDate: new Date(2024,10,1)
  },
  {
    company: "designYourLife",
    startDate: new Date(2022,10,1),
    endDate: new Date(2023,2,1)
  }
];

const formatDateRu = function (date) {
  const month = date.getMonth();
  const year = String(date.getFullYear()).slice(-2);
  return `${MonthsRuLocale[month]} ${year}`;
};

const getExpDatePeriodDuration = function (startDate, endDate) {
  const durationInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
  const years = Math.floor(durationInMonths / 12);
  const months = durationInMonths % 12;

  return {
    years,
    months
  };
};

const formatDateRuPluralization = function (number, wordForms) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return wordForms[0];
  }

  if (lastDigit >= 2 && lastDigit <= 4
    && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return wordForms[1];
  }
  
  return wordForms[2];
};

const getExpDatePeriodText = function (company) {
  const expDatePeriod = expDatePeriods.find(function(period) {
    return period.company === company;
  });
  if (!expDatePeriod) {
    return;
  }
  const duration = getExpDatePeriodDuration(expDatePeriod.startDate, expDatePeriod.endDate);
  const startDateText = formatDateRu(expDatePeriod.startDate);
  let endDateText;
    if (expDatePeriod.endDate === currentDate) {
      endDateText = 'Сейчас';
    } else {
      endDateText = formatDateRu(expDatePeriod.endDate);
    }
  const durationTextParts = [];

  if (duration.years > 0) {
    durationTextParts.push(`${duration.years} ${formatDateRuPluralization(duration.years, ['год', 'года', 'лет'])}`);
  }

  if (duration.months > 0) {
    durationTextParts.push(`${duration.months} ${formatDateRuPluralization(duration.months, ['месяц', 'месяца', 'месяцев'])}`);
  }

  if (durationTextParts.length === 0) {
    durationTextParts.push('меньше месяца');
  }

  return `${startDateText} – ${endDateText} · ${durationTextParts.join(' ')}`;
};

icerockExpDatePeriods[0].textContent = getExpDatePeriodText('icerockDevLast');
icerockExpDatePeriods[1].textContent = getExpDatePeriodText('icerockDevFirst');
atfExpDatePeriod.textContent = getExpDatePeriodText('alientTechFusion');
dylExpDatePeriod.textContent = getExpDatePeriodText('designYourLife');