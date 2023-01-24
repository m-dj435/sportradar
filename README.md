# Getting familiar with this app

This app is about Ekstraklasa seasons. In order to see timeline of particular match please click on table row representing sport event you are interested in.

## Env.

Please see that this uses SECRET_KEY. In order to use this app please set your own key please register [https://developer.sportradar.com/docs/read/Home](sportradar) over there. Furthermore please set you REACT_APP_API_KEY in .env.local file in the root of project

## Please be aware of CORS issue.

Unfortunately I struggle with sportradar calls ended up with CORS error.
In order to fix problem I could make an proxy server however that was not the point of my tasks so I decided to use [Moesif Origin & CORS Changer](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) chrome extension.

### In project helpers folder

You can find mocked data that can be easily set up for a season table.
You need to remove from homepage.js the following:

```
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      `https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:${value}/schedules.json?api_key=${URL}`
    );
    setData(result.data.schedules);
    setIsLoading(false);
  };
  fetchData();
}, [value]);
```

```
if (isLoading) return <Spinner />;
```

And finally here replace data with schedules that are already imported in file

```
const filteredDataSeasons = data.filter(
  ({ sport_event }) =>
    sport_event.sport_event_context.season.name === seasonName
);
```

Please be aware that timeline might use mock data as well but with only three random matches info. Find them in helpers folder. To set this up please get yourself familiar with this app.
