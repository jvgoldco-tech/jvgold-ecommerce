import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowRight } from 'lucide-react';

const CategoryCoverGrid = () => {
  const collections = useStore(state => state.catalogs.collections);
  const products = useStore(state => state.products);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 w-full border-t border-l border-primary/10">
      {collections.map(collection => {
        const count = products.filter(p => p.category.toUpperCase() === collection.name.toUpperCase()).length;
        
        return (
          <Link 
            key={collection.id} 
            to={`/category/${collection.id}`}
            className="group relative aspect-[3/4] overflow-hidden border-b border-r border-primary/10 bg-primary"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${collection.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-12 left-12 right-12">
              <span className="text-white/60 text-xs tracking-widest mb-3 block">{count} {count === 1 ? 'PIECE' : 'PIECES'}</span>
              <div className="flex justify-between items-end">
                <h3 className="text-4xl font-display text-white relative inline-block">
                  {collection.name}
                  <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-accent/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
                </h3>
                <ArrowRight className="text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryCoverGrid;
