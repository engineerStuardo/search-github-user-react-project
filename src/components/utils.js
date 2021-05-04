const convertToArray = (object, type) => {
  const newArr = Object.values(object);

  if (type === 'pie')
    return newArr
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, 5);

  if (type === 'doughnut')
    return newArr
      .sort((a, b) => {
        return b.stars - a.stars;
      })
      .map(item => {
        return { ...item, value: item.stars };
      })
      .slice(0, 5);

  if (type === 'columnAndBar') return newArr.slice(-5).reverse();
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

  const pieData = convertToArray(languages, 'pie');
  const doughnutData = convertToArray(languages, 'doughnut');

  return { pieData, doughnutData };
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

  const columnData = convertToArray(stars, 'columnAndBar');
  const barData = convertToArray(forks, 'columnAndBar');

  return { columnData, barData };
};
