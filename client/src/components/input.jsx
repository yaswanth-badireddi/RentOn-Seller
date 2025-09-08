const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-blue-500' />
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 
						   bg-slate-100 dark:bg-slate-700 
						   rounded-lg 
						   border border-slate-300 dark:border-slate-600 
						   focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
						   text-slate-900 dark:text-white 
						   placeholder-slate-500 dark:placeholder-slate-400 
						   transition duration-200'
			/>
		</div>
	);
};

export default Input;
