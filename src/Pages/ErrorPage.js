const ErrorPage = () => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			<h1 className='text-[64px]'>404</h1>
			<h6 className='mb-10'>Page not found</h6>
			<a href='/'>
				<button class='btn btn-primary'>Back to home</button>
			</a>
		</div>
	);
};

export default ErrorPage;
