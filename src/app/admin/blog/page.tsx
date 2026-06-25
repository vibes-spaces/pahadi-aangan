'use client';
import { useState, useMemo, useCallback } from 'react';
import { getBlogPosts, saveBlogPosts, generateId } from '@/lib/store';
import type { BlogPost } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatDate, cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { FileText, Plus, Pencil, Trash2, X, Star, StarOff, ImageIcon, Loader2 } from 'lucide-react';

const categories = ['Architecture', 'Culture', 'Food', 'Travel', 'Nature'];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const blankForm: BlogPost = {
  id: '', slug: '', title: '', excerpt: '', content: '', author: '',
  date: new Date().toISOString().split('T')[0], image: '', category: 'Architecture',
  tags: [], featured: false,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BlogPost>(blankForm);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const openAdd = useCallback(() => {
    setEditing(null);
    setForm(blankForm);
    setSlugManuallyEdited(false);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((post: BlogPost) => {
    setEditing(post);
    setForm({ ...post, tags: [...post.tags] });
    setSlugManuallyEdited(true);
    setShowModal(true);
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: !slugManuallyEdited ? generateSlug(title) : prev.slug,
    }));
  }, [slugManuallyEdited]);

  const toggleFeatured = useCallback((post: BlogPost) => {
    try {
      const updated = posts.map(p => p.id === post.id ? { ...p, featured: !p.featured } : p);
      saveBlogPosts(updated);
      setPosts(updated);
      toast.success(post.featured ? 'Featured removed' : 'Marked as featured');
    } catch {
      toast.error('Failed to update featured status');
    }
  }, [posts]);

  const handleSave = useCallback(() => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.slug.trim()) { toast.error('Slug is required'); return; }
    setSaving(true);
    try {
      const tags = typeof form.tags === 'string'
        ? (form.tags as unknown as string).split(',').map(t => t.trim()).filter(Boolean)
        : form.tags;
      let updated: BlogPost[];
      if (editing) {
        updated = posts.map(p => p.id === editing.id ? { ...form, tags } : p);
      } else {
        const newPost: BlogPost = { ...form, id: generateId('B'), tags };
        updated = [...posts, newPost];
      }
      saveBlogPosts(updated);
      setPosts(updated);
      toast.success(editing ? 'Blog post updated' : 'Blog post created');
      setShowModal(false);
    } catch {
      toast.error('Failed to save blog post');
    } finally {
      setSaving(false);
    }
  }, [form, editing, posts]);

  const handleDelete = useCallback(() => {
    if (!deleteConfirmId) return;
    try {
      const updated = posts.filter(p => p.id !== deleteConfirmId);
      saveBlogPosts(updated);
      setPosts(updated);
      setDeleteConfirmId(null);
      toast.success('Blog post deleted');
    } catch {
      toast.error('Failed to delete blog post');
    }
  }, [posts, deleteConfirmId]);

  const tagString = useMemo(
    () => (typeof form.tags === 'string' ? form.tags : form.tags.join(', ')),
    [form.tags]
  );

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Blog Posts</h1>
            <p className="text-sm text-stone-500 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-ochre-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </FadeIn>

      {posts.length === 0 ? (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-stone-300" />
            </div>
            <p className="text-stone-500 font-medium">No blog posts yet</p>
            <p className="text-sm text-stone-400 mt-1">Click &quot;New Post&quot; to create your first article</p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.05}>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Title</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Author</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Category</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-stone-600">Date</th>
                    <th className="text-center py-3.5 px-4 font-semibold text-stone-600">Featured</th>
                    <th className="text-right py-3.5 px-4 font-semibold text-stone-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0">
                            {post.image ? (
                              <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-stone-300" /></div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-stone-900 truncate max-w-[240px]">{post.title}</p>
                            {post.excerpt && <p className="text-xs text-stone-500 truncate max-w-[240px]">{post.excerpt}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-600">{post.author}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium text-ochre-600 bg-ochre-50 px-2.5 py-1 rounded-full">{post.category}</span>
                      </td>
                      <td className="py-3 px-4 text-stone-500 text-xs whitespace-nowrap">{formatDate(post.date)}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(post)}
                          aria-label={post.featured ? 'Unmark featured' : 'Mark featured'}
                          className={cn(
                            'p-1.5 rounded-lg transition-all',
                            post.featured
                              ? 'text-ochre-600 bg-ochre-50 hover:bg-ochre-100'
                              : 'text-stone-300 hover:text-stone-500 hover:bg-stone-100'
                          )}
                        >
                          {post.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(post)} aria-label="Edit post" className="p-2 rounded-lg text-stone-400 hover:text-ochre-600 hover:bg-ochre-50 transition-all">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirmId(post.id)} aria-label="Delete post" className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 my-8 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-stone-900">{editing ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setShowModal(false)} aria-label="Close modal" className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Slug <span className="text-red-500">*</span></label>
                <input
                  value={form.slug}
                  onChange={e => { setForm({ ...form, slug: e.target.value }); setSlugManuallyEdited(true); }}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 font-mono text-xs"
                  placeholder="post-title-slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 bg-white"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Author</label>
                <input
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                <input
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              {form.image && (
                <div className="md:col-span-2 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={form.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-40 object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 resize-none"
                  placeholder="Brief summary of the post"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Content</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500 resize-none"
                  placeholder="Full article content..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Tags (comma separated)</label>
                <input
                  value={tagString}
                  onChange={e => setForm({ ...form, tags: e.target.value as unknown as string[] })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-ochre-500/30 focus:border-ochre-500"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={e => setForm({ ...form, featured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-200 rounded-full peer-checked:bg-ochre-600 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                  </div>
                  <span className="text-sm font-medium text-stone-700">Featured post</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ochre-600 text-white font-semibold hover:bg-ochre-500 transition-all shadow-lg shadow-ochre-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? 'Update' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
}
