export default async (body, { rejectWithValue, }) => {

	try {

	} catch (error) {
		rejectWithValue(error.message)
	}
};