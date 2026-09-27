import React, { useState } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const EditListingPage = ({ productId, onNavigate }) => {
  const { products, updateProduct, deleteProduct } = useStore();
  const product = products.find(p => p.id === productId) || products[0];

  const [formData, setFormData] = useState({
    title: product ? product.title : '',
    price: product ? product.price : '',
    condition: product ? product.condition : 'Good',
    description: product ? product.description : '',
    pickupLocation: product ? product.pickupLocation : ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProduct(product.id, {
      ...formData,
      price: Number(formData.price)
    });
    onNavigate('/dashboard/listings');
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    onNavigate('/dashboard/listings');
  };

  return (
    <div className="space-y-6 font-sans max-w-2xl">
      
      <div className="flex items-center justify-between pb-4 border-b border-cx-800">
        <div>
          <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
            EDIT LISTING SPEC
          </h1>
          <p className="text-xs text-cx-400 font-mono mt-1">
            Modify price, description, or availability for this listing.
          </p>
        </div>

        <Button variant="ghost" size="sm" onClick={() => onNavigate('/dashboard/listings')}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <Input
          label="PRODUCT TITLE"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="PRICE (₹ INR)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium block mb-1.5">
              CONDITION
            </label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full bg-cx-900 border border-cx-700 text-cx-0 rounded-cx-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-cx-0"
            >
              <option value="Like New">Like New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
        </div>

        <Input
          label="HANDOVER LOCATION"
          value={formData.pickupLocation}
          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
          required
        />

        <Textarea
          label="DESCRIPTION"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <div className="pt-4 flex items-center justify-between">
          <Button type="button" variant="secondary" size="md" onClick={handleDelete} leftIcon={<Trash2 className="w-4 h-4" />}>
            Delete Listing
          </Button>

          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </form>

    </div>
  );
};
