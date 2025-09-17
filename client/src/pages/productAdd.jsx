import React, { useState } from 'react';
import { FaTag, FaAlignLeft, FaThLarge, FaDollarSign, FaImage ,FaBox} from 'react-icons/fa';
import Input from '../components/Input';
import { useProductStore } from '../store/productStore';

const ProductAdd = () => {
	const [form, setForm] = useState({
		title: '',
		description: '',
		category: '',
		rental_price: '',
		quantity: '1',
	});

	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const { addProduct } = useProductStore();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		try {
			const formData = new FormData();
			Object.entries(form).forEach(([key, value]) => {
				formData.append(key, value);
			});
			if (imageFile) {
				formData.append('image', imageFile);
			}
			// console.log([...formData.entries()]);

			await addProduct(formData);

			setMessage({ type: 'success', text: 'Product added successfully!' });

			// Reset form
			setForm({
				title: '',
				description: '',
				category: '',
				rental_price: '',
				quantity: '',
			});
			setImageFile(null);
			setImagePreview(null);
		} catch (err) {
			console.error('Error adding product:', err);
			setMessage({ type: 'error', text: 'Failed to add product.' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='p-6 sm:p-10 bg-white dark:bg-slate-900 min-h-screen text-slate-900 dark:text-white'>
			<h2 className='text-2xl font-semibold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2'>
				Add New Product
			</h2>

			<form
				onSubmit={handleSubmit}
				className='bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 w-full max-w-2xl mx-auto space-y-4'
				encType='multipart/form-data'
			>
				<Input
					icon={FaTag}
					type='text'
					name='title'
					placeholder='Product Title'
					value={form.title}
					onChange={handleChange}
					required
				/>

				<Input
					icon={FaAlignLeft}
					type='text'
					name='description'
					placeholder='Description'
					value={form.description}
					onChange={handleChange}
					required
				/>

				<Input
					icon={FaThLarge}
					type='text'
					name='category'
					placeholder='Category'
					value={form.category}
					onChange={handleChange}
					required
				/>

				<Input
					icon={FaDollarSign}
					type='number'
					name='rental_price'
					placeholder='Rental Price'
					value={form.rental_price}
					onChange={handleChange}
					required
				/>
				<Input
				   icon={FaBox}
				   type='number'
				   name='quantity'
				   placeholder='1'
				   value={form.quantity}
				   onChange={handleChange}
				/>

				<div className='relative mb-6'>
					<label className='block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300'>
						<FaImage className='inline-block mr-2 text-blue-500' />
						Product Image
					</label>
					<input
						type='file'
						accept='image/*'
						onChange={handleImageChange}
						className='w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg border border-slate-300 dark:border-slate-600'
					/>
					{imagePreview && (
						<img
							src={imagePreview}
							alt='Preview'
							className='mt-2 w-32 h-32 object-cover rounded-md border border-slate-300 dark:border-slate-600'
						/>
					)}
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50'
				>
					{loading ? 'Adding...' : 'Add Product'}
				</button>

				{message && (
					<p
						className={`text-sm mt-2 ${
							message.type === 'success' ? 'text-blue-500' : 'text-red-500'
						}`}
					>
						{message.text}
					</p>
				)}
			</form>
		</div>
	);
};

export default ProductAdd;
