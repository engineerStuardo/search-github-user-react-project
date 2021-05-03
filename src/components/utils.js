const convertToArray = (object, type) => {
  if (type === 'pie')
    return Object.values(object)
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, 5);

  if (type === 'doughnut')
    return Object.values(object)
      .sort((a, b) => {
        return b.stars - a.stars;
      })
      .map(item => {
        return { ...item, value: item.stars };
      })
      .slice(0, 5);

  if (type === 'columnAndBar') return Object.values(object).slice(-5).reverse();
};

export const dataPieAndDoughnutChart = repos => {
  const languages = repos.reduce((total, { language, stargazers_count }) => {
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const pie = convertToArray(languages, 'pie');
  const doughnut = convertToArray(languages, 'doughnut');

  return { pie, doughnut };
};

export const dataColumnAndBarChart = repos => {
  const { stars, forks } = repos.reduce(
    (total, { stargazers_count, name, forks }) => {
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );

  const column = convertToArray(stars, 'columnAndBar');
  const bar = convertToArray(forks, 'columnAndBar');

  return { column, bar };
};
