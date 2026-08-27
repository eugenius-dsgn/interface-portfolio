/*Display swap script*/

const introductionDisplay = document.querySelector('#introduction-display');
const tabList = document.querySelector('.tablist');
const tabs = tabList.querySelectorAll('.tab');

const displayTexts = {
  hr: 'Отработал 5\u00a0лет над интерфейсными проектами в\u00a0студийных командах с\u00a0продуктовым подходом. Задизайнил 20\u00a0мобильных и\u00a06\u00a0веб-приложений, 10\u00a0сайтов в\u00a0сферах лайфстайл-сервисов, недвижимости, образования и\u00a0здоровья',
  'design-lead': 'При создании интерфейса ищу первоисточник задачи, уточняю детали, дизайню итерационно и\u00a0проверяю решения с\u00a0помощью интерактивных прототипов. Впитываю опыт и\u00a0знания команды, а\u00a0также делюсь своими, чтобы быть вовлечённым и\u00a0получать удовольствие от\u00a0работы. Дизайню сайты на\u00a0HTML, CSS, JS. Умею в\u00a0Protopie. Применяю гайды. Чистюля в\u00a0Figma.',
  'head-manager': 'На связи. Вместе с\u00a0разработчиками ищу решения, которые выполняют свою задачу и\u00a0влезают в\u00a0бюджет. Контролирую реализацию дизайна вместе с\u00a0аналитиками и\u00a0QA, чтобы обеспечить высокое качество продукта.'
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