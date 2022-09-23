import { useRef } from "react";
import { PuffLoader } from "react-spinners";

function Form({ setUser, setIsLoading, loading }) {
	let fetchUrl = "https://api.github.com/users";

	const userInput = useRef();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const userName = userInput.current.value.toLowerCase();

			if (userName.length === 0) return;

			setIsLoading(true);

			const userResponse = await fetch(`${fetchUrl}/${userName}`);

			const data = await userResponse.json();

			setUser({
				error: "",
				Avatar: data.avatar_url,
				UserName: data.login,
				Name: data.name,
				PublicRepos: data.public_repos,
				PublicGists: data.public_gists,
				CreatedAt: data.created_at,
			});

			if (userResponse.status === 404) {
				setUser({
					error: data.message,
					Avatar: "",
					UserName: "",
					Name: "",
					PublicRepos: "",
					PublicGists: "",
					CreatedAt: "",
				});
			}

			console.log(data);

			setTimeout(() => {
				setIsLoading(false);
			}, 1100);
		} catch (error) {
			setIsLoading(false);
			console.log(error);

			setUser({
				Avatar: "",
				UserName: "",
				Name: "",
				PublicRepos: "",
				PublicGists: "",
				CreatedAt: "",
			});
		}
	}

	return (
		<div className="max-w-2xl w-full mx-auto sm:p-10 px-5 md:py-10 py-8 relative overflow-hidden rounded-xl bg-teal-900 bg-opacity-5">
			<div className="absolute -top-12 -right-14 h-24 bg-teal-700 bg-opacity-70 w-24 -rotate-[45deg]"></div>
			<form onSubmit={handleSubmit} className="flex flex-col h-full flex-none">
				<div className="flex flex-col">
					<label htmlFor="UserName" className="text-gray-300 font-medium capitalize">
						UserName
					</label>
					<input
						ref={userInput}
						type="text"
						placeholder="Enter User Name"
						className="outline-none border text-base font-semibold mt-2 border-none ring-1 ring-teal-700 rounded-md text-teal-600 transition-all duration-200 focus:placeholder:text-transparent ease-in bg-transparent focus:outline-none py-2 px-4"
						required
					/>
				</div>
				<button
					type="submit"
					className="self-start mt-5 border-none outline-none rounded-md py-1 px-3 text-teal-500 hover:ring-1 hover:ring-teal-600 capitalize font-black transition-all duration-200 ease-in">
					{loading ? <PuffLoader size={25} color="#36d7b7" /> : "find"}
				</button>
			</form>
		</div>
	);
}

export default Form;
