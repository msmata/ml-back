import app from './App';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('ML-Back running on port: ', PORT);
});
