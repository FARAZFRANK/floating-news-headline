import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { IconMagnifyingGlass, IconSpinner, IconImage, IconPlusCircle, IconArticle, IconTrash, IconWarningCircle } from './Icons';

const ManualPostPicker = ({ selectedIds, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);

    // Fetch full post objects for the selected IDs on mount
    useEffect(() => {
        if (selectedIds && selectedIds.length > 0) {
            fetchSelectedPosts();
        }
    }, []);

    const fetchSelectedPosts = async () => {
        const posts = await apiFetch({ path: `floating-news-headline/v1/posts?source=manual&ids=${selectedIds.join(',')}` });
        setSelectedPosts(posts);
    };

    const handleSearch = async (value) => {
        setSearchTerm(value);
        if (value.length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const data = await apiFetch({ path: `floating-news-headline/v1/search?q=${encodeURIComponent(value)}` });
            setResults(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const addPost = (post) => {
        if (selectedIds.includes(post.id)) return;
        if (selectedIds.length >= 5) {
            alert('Free version is limited to 5 manual posts.');
            return;
        }

        const newIds = [...selectedIds, post.id];
        setSelectedPosts([...selectedPosts, post]);
        onChange(newIds);
        setSearchTerm('');
        setResults([]);
    };

    const removePost = (id) => {
        const newIds = selectedIds.filter(postId => postId !== id);
        setSelectedPosts(selectedPosts.filter(p => p.id !== id));
        onChange(newIds);
    };

    return (
        <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {isSearching ? <IconSpinner className="w-5 h-5 text-slate-400 animate-spin" /> : <IconMagnifyingGlass className="w-5 h-5 text-slate-400" />}
                </div>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search posts or pages by title..."
                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-inter"
                />
                
                {/* Search Results Dropdown */}
                {results.length > 0 && (
                    <div className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto overflow-x-hidden">
                        {results.map(post => (
                            <button
                                key={post.id}
                                onClick={() => addPost(post)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-indigo-50 transition-colors text-left border-b border-slate-50 last:border-0"
                            >
                                {post.image_url ? (
                                    <img src={post.image_url} className="w-8 h-8 rounded shrink-0 object-cover" alt="" />
                                ) : (
                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                                        <IconImage className="w-4 h-4 text-slate-400" />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-slate-700 truncate">{post.title}</span>
                                <IconPlusCircle className="ml-auto w-5 h-5 text-indigo-400 group-hover:text-indigo-600" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Posts List */}
            <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Selected Posts ({selectedIds.length}/5)
                </label>
                
                {selectedPosts.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-100 rounded-xl p-8 text-center bg-slate-50/50">
                        <IconPlusCircle className="mx-auto w-8 h-8 text-slate-300 mb-2" />
                        <p className="text-xs text-slate-400">No posts selected yet. Use the search box above to add content.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2">
                        {selectedPosts.map(post => (
                            <div key={post.id} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
                                {post.image_url ? (
                                    <img src={post.image_url} className="w-10 h-10 rounded shrink-0 object-cover" alt="" />
                                ) : (
                                    <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center shrink-0">
                                        <IconArticle className="w-5 h-5 text-indigo-400" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-700 truncate">{post.title}</h4>
                                    <span className="text-[10px] text-slate-400">ID: {post.id}</span>
                                </div>
                                <button 
                                    onClick={() => removePost(post.id)}
                                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                    title="Remove post"
                                >
                                    <IconTrash className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {selectedIds.length >= 5 && (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                    <IconWarningCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                        You've reached the limit of 5 posts. <strong>Upgrade to Pro</strong> to select unlimited posts and pages.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ManualPostPicker;
