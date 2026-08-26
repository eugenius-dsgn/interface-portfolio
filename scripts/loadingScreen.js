/* Loading Screen Script */

const overlay = document.querySelector('.overlay');
const progressIndicator = document.querySelector('.progress-indicator');
const statusWrapper = document.querySelector('#status-wrapper');
const statusesBelt = document.querySelector('#statuses-belt');

const statuses = [
  'Стаскиваю одеялко',
  'Делаю зарядку',
  'Наливаю чаёк',
  'Включаю мак',
  'Дизайню кодом'
];

const statusesCount = statuses.length;

for (let i=0; i < statusesCount; i++) {
 let statusTitle = document.createElement('h1')
 statusTitle.textContent=`${statuses[i]}`
 statusesBelt.append(statusTitle)

 let statusStyle = getComputedStyle(statusTitle);
 let statusFullHeight = statusTitle.offsetHeight + parseFloat(statusStyle.marginTop) + parseFloat(statusStyle.marginBottom);
 statusWrapper.style.height = statusFullHeight + 'px';
};

const minSwapTime = 500;
const maxSwapTime = 800;
let currentStatusIndex = 0;

const releaseLoadingState = function() {
  if (!document.body.classList.contains('is-loading')) {
    return;
  }
  document.body.classList.remove('is-loading');
};

const getSwapTime = function() {
  let progress = (currentStatusIndex - 1) / (statusesCount-1);
  return Math.max(minSwapTime, maxSwapTime - (maxSwapTime - minSwapTime) * progress);
};

const showNextStatus = function() {
  statusesBelt.style.transform = `translateY(${-100 * currentStatusIndex}%)`;
  currentStatusIndex += 1;
  
  let progress = (currentStatusIndex / statusesCount) * 100;
  progressIndicator.style.width = `${Math.min(100, Math.max(progress, 0))}%`;

  if (currentStatusIndex === statusesCount) {
    setTimeout(function() {
      overlay.style.transform = 'translateY(-100%)';
      overlay.addEventListener('transitionend', function() {
        document.body.classList.remove('is-loading');
      }, { once: true });
    }, minSwapTime);
    return;
  }
  setTimeout(showNextStatus, getSwapTime());
};

window.addEventListener('load', function(){
  document.body.classList.add('is-loading');
  showNextStatus();
});