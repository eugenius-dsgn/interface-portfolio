# Experience Date Period

## Purpose

The experience section displays each employment period together with its duration in years and months.

The date ranges are stored in JavaScript. The script formats the dates, calculates the duration, builds the complete text, and writes it into the existing `.experience-date-period` elements.

## Entry Points

- Markup: `index.html`
- Behavior and data: `scripts/main.js`

## Markup Contract

Required elements:

- `#icerock-dev .experience-date-period` — two elements for two IceRock periods
- `#alien-tech-fusion .experience-date-period` — one element
- `#design-your-life .experience-date-period` — one element

The elements are empty containers. JavaScript assigns their complete `textContent` after the page loads.

## Period Data

Employment periods are stored in the `expDatePeriods` array. Each object contains:

- `company` — unique period identifier
- `startDate` — start date as a `Date` object
- `endDate` — end date as a `Date` object

The current date is stored in `currentDate` and reused as the end date for ongoing periods.

JavaScript's numeric `Date` constructor is used. Its month index starts at `0`:

```js
new Date(2024, 10, 1); // November 2024
```

The day is set to `1` so all calculations use the beginning of a calendar month.

## Date Localization

`formatDateRu` converts a `Date` object into a Russian date label:

```text
Date object -> Месяц YY
2022, 3     -> Апрель 22
```

The month number returned by `getMonth()` is used as the index of `MonthsRuLocale`. The full year is converted to a string, and `slice(-2)` keeps its last two digits.

Ongoing periods use the visible label `Сейчас` instead of formatting the current date.

## Duration Calculation

`getExpDatePeriodDuration` receives only `startDate` and `endDate`. It does not search the periods array.

First, the function converts the year difference to months and adds the difference between the month indexes:

$$
durationInMonths = (endYear - startYear) \times 12 + endMonth - startMonth
$$

For April 2022 to November 2024:

```text
(2024 - 2022) * 12 + 10 - 3 = 31 months
```

The total is then separated into complete years and the remaining months:

```js
years = Math.floor(durationInMonths / 12);
months = durationInMonths % 12;
```

The function returns an object:

```js
{
  years: 2,
  months: 7
}
```

The calculation uses calendar months rather than milliseconds or days. The month values follow the `Date` API's zero-based indexing.

## Russian Pluralization

`formatDateRuPluralization` receives a number and three word forms:

```js
['год', 'года', 'лет']
['месяц', 'месяца', 'месяцев']
```

It checks the last digit and the last two digits of the number:

- `1`, except `11`, uses the first form;
- `2` to `4`, except `12` to `14`, uses the second form;
- all other values use the third form.

Examples:

```text
1 год
2 года
5 лет
21 год
22 года
1 месяц
8 месяцев
```

## Text Assembly

`getExpDatePeriodText` performs the complete text-building workflow:

1. Finds a period by its `company` value using `.find()`.
2. Stops without producing text if no matching period exists.
3. Passes the found dates to `getExpDatePeriodDuration`.
4. Formats the start date with `formatDateRu`.
5. Displays `Сейчас` for an ongoing end date, otherwise formats the end date.
6. Creates an array for the visible duration parts.
7. Adds years only when the number of years is greater than zero.
8. Adds months only when the number of months is greater than zero.
9. Uses `меньше месяца` when both values are zero.
10. Applies Russian pluralization to every displayed value.
11. Returns a complete string.

Example result for a period shorter than one year:

```text
Ноябрь 22 – Март 23 · 4 месяца
```

For a period containing complete years and remaining months, both parts are displayed:

```text
Апрель 22 – Ноябрь 24 · 2 года 7 месяцев
```

## DOM Updates

After the functions are declared, the script assigns the generated text to the corresponding elements:

```js
icerockExpDatePeriods[0].textContent = getExpDatePeriodText('icerockDevLast');
icerockExpDatePeriods[1].textContent = getExpDatePeriodText('icerockDevFirst');
atfExpDatePeriod.textContent = getExpDatePeriodText('alientTechFusion');
dylExpDatePeriod.textContent = getExpDatePeriodText('designYourLife');
```

IceRock uses `querySelectorAll` because it contains two date-period elements. The other companies use `querySelector` because each has one period.

## Constraints

- Keep company identifiers synchronized between `expDatePeriods` and DOM update calls.
- Keep the order of IceRock objects synchronized with the order of its `.experience-date-period` elements.
- Use zero-based month indexes when constructing dates with `new Date(year, month, day)`.
- The script is classic non-module JavaScript and runs in the shared page scope.
- The current implementation compares the ongoing period's `endDate` with the shared `currentDate` object by reference. If the data model later creates a separate `Date` object for the same current day, this check must be replaced with an explicit property such as `isCurrent`.
