const videoGrid = document.querySelector('#videoGrid');
const form = document.querySelector('#videoForm');
const videoInput = document.querySelector('#videoInput');
const formMessage = document.querySelector('#formMessage');
const playerModal = document.querySelector('#playerModal');
const youtubeFrame = document.querySelector('#youtubeFrame');
const playerTitle = document.querySelector('#playerTitle');
const playerChannel = document.querySelector('#playerChannel');
const watchOnYoutube = document.querySelector('#watchOnYoutube');
const toast = document.querySelector('#toast');
const notesGrid = document.querySelector('#notesGrid');
const notesSearch = document.querySelector('#notesSearch');
const notesVideoFilter = document.querySelector('#notesVideoFilter');
const notesSort = document.querySelector('#notesSort');
const notesCount = document.querySelector('#notesCount');
const exportNotesButton = document.querySelector('#exportNotesButton');
const importNotesButton = document.querySelector('#importNotesButton');
const importNotesInput = document.querySelector('#importNotesInput');
const openSharedNotesInline = document.querySelector('#openSharedNotesInline');
const noteModal = document.querySelector('#noteModal');
const noteForm = document.querySelector('#noteForm');
const noteTitle = document.querySelector('#noteTitle');
const noteContent = document.querySelector('#noteContent');
const noteTags = document.querySelector('#noteTags');
const noteColor = document.querySelector('#noteColor');
const noteTimestampSeconds = document.querySelector('#noteTimestampSeconds');
const insertTimestampButton = document.querySelector('#insertTimestampButton');
const noteVideoName = document.querySelector('#noteVideoName');
const noteDialogTitle = document.querySelector('#noteDialogTitle');
const minimizeNoteButton = document.querySelector('#minimizeNote');
const playerNotesPanel = document.querySelector('#playerNotesPanel');
const togglePlayerNotesButton = document.querySelector('#togglePlayerNotesButton');
const videoTimerMinutes = document.querySelector('#videoTimerMinutes');
const videoTimerButton = document.querySelector('#videoTimerButton');
const videoTimerStatus = document.querySelector('#videoTimerStatus');
const sharedNoteModal = document.querySelector('#sharedNoteModal');
const sharedNoteForm = document.querySelector('#sharedNoteForm');
const sharedNoteContent = document.querySelector('#sharedNoteContent');
const deleteNoteModal = document.querySelector('#deleteNoteModal');
const confirmDeleteNoteButton = document.querySelector('#confirmDeleteNote');
let pendingDeleteNoteId = null;
const menuButton = document.querySelector('#menuButton');
const closeMenuButton = document.querySelector('#closeMenu');
const sideMenu = document.querySelector('#sideMenu');
const menuBackdrop = document.querySelector('#menuBackdrop');
const playlistsGrid = document.querySelector('#playlistsGrid');
const playlistCount = document.querySelector('#playlistCount');
const playlistModal = document.querySelector('#playlistModal');
const playlistForm = document.querySelector('#playlistForm');
const playlistDialogTitle = document.querySelector('#playlistDialogTitle');
const playlistTitle = document.querySelector('#playlistTitle');
const playlistDescription = document.querySelector('#playlistDescription');
const playlistVideoPicker = document.querySelector('#playlistVideoPicker');
let playlists = JSON.parse(localStorage.getItem('alxplay-playlists') || '[]');
let editingPlaylistId = null;
let playlistQueue = [];
let playlistQueueIndex = 0;
const savedNotes = JSON.parse(localStorage.getItem('alxplay-notes') || '[]');
let notes = Array.isArray(savedNotes) ? savedNotes : [];
let currentVideo = null;
let currentVideoTime = 0;
let hasReceivedVideoTime = false;
let timestampRequestPending = false;
let editingNoteId = null;
let minimizedNoteDraft = null;
let videoTimer = null;
let videoTimerInterval = null;
let notesViewState = { query: '', videoId: '', sort: 'modified' };
const clearAllHistory = document.querySelector('#clearAllHistory');
const savedHistory = JSON.parse(localStorage.getItem('alxplay-history') || 'null') || [];
const starterVideoIds = new Set(['dQw4w9WgXcQ', 'M7lc1UVf-VE', 'ysz5S6PUM-U']);
let history = savedHistory.filter((video) => !starterVideoIds.has(video.id));
if (history.length !== savedHistory.length) {
  localStorage.setItem('alxplay-history', JSON.stringify(history));
}

function persistHistory() {
  localStorage.setItem('alxplay-history', JSON.stringify(history));
}

function persistNotes() {
  localStorage.setItem('alxplay-notes', JSON.stringify(notes));
}

function persistPlaylists() {
  localStorage.setItem('alxplay-playlists', JSON.stringify(playlists));
}

function ensureVideosForNotes(noteList) {
  const missingVideos = noteList
    .filter((note) => note?.videoId && !history.some((video) => video.id === note.videoId))
    .map((note) => ({
      id: note.videoId,
      title: note.videoTitle || 'Video de YouTube',
      author: note.videoChannel || 'YouTube',
      time: 'YouTube',
      color: 'linear-gradient(135deg, #1c4178, #6339a7)'
    }));
  const uniqueVideos = [...new Map(missingVideos.map((video) => [video.id, video])).values()];
  if (!uniqueVideos.length) return;
  history = [...uniqueVideos, ...history];
  persistHistory();
  renderCards();
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));
}

function formatDate(value) {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function formatTimestamp(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;
  return [hours, minutes, remainingSeconds].map((part) => String(part).padStart(2, '0')).join(':');
}

function renderNoteContent(content = '', noteId = '') {
  let timestampNumber = 0;
  return escapeHtml(content).replace(/(?:^|\n)\s*(?:#\d+\s*)?(\d{2}:\d{2}:\d{2})\s*(?:[—-])?\s*(?=\n|$)/g, (_, timestamp) => {
    timestampNumber += 1;
    return `<span class="timestamp-item"><span class="timestamp-index">#${timestampNumber}</span><span class="timestamp-value">${timestamp}</span><button type="button" class="timestamp-jump" data-note-id="${noteId}" data-timestamp="${timestamp}">▶ Ir al momento</button></span>`;
  }).replace(/\n{2,}/g, '\n');
}

function timestampToSeconds(timestamp) {
  const parts = timestamp.split(':').map(Number);
  return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
}

function renderPlaylistVideoPicker(selectedIds = []) {
  playlistVideoPicker.innerHTML = history.length ? history.slice(0, 20).map((video) => `<label class="playlist-video-option"><input type="checkbox" value="${escapeHtml(video.id)}" ${selectedIds.includes(video.id) ? 'checked' : ''} /><span>${escapeHtml(video.title)}</span></label>`).join('') : '<p class="form-hint">Primero agrega videos al historial.</p>';
}

function openPlaylistEditor(playlist = null) {
  editingPlaylistId = playlist?.id || null;
  playlistDialogTitle.textContent = playlist ? 'Editar lista' : 'Nueva lista';
  playlistTitle.value = playlist?.title || '';
  playlistDescription.value = playlist?.description || '';
  renderPlaylistVideoPicker(playlist?.videoIds || []);
  playlistModal.classList.add('open');
  playlistModal.setAttribute('aria-hidden', 'false');
  playlistTitle.focus();
}

function closePlaylistEditor() {
  playlistModal.classList.remove('open');
  playlistModal.setAttribute('aria-hidden', 'true');
  editingPlaylistId = null;
}

function renderPlaylists() {
  if (!playlistsGrid) return;
  playlistCount.textContent = `${playlists.length} ${playlists.length === 1 ? 'lista' : 'listas'}`;
  playlistsGrid.innerHTML = playlists.length ? playlists.map((playlist) => {
    const playlistVideos = playlist.videoIds.map((id) => history.find((video) => video.id === id)).filter(Boolean);
    return `<article class="playlist-card"><div class="playlist-card-header"><div><h3>${escapeHtml(playlist.title)}</h3><p>${escapeHtml(playlist.description || 'Sin descripción')}</p></div><span class="playlist-video-count">${playlistVideos.length} videos</span></div><div class="playlist-video-list">${playlistVideos.length ? playlistVideos.map((video, index) => `<div class="playlist-video-row"><button class="playlist-play-video" type="button" data-play-video="${video.id}" aria-label="Reproducir ${escapeHtml(video.title)}">▶</button><span>${escapeHtml(video.title)}</span><button type="button" data-playlist-action="up" data-playlist-id="${playlist.id}" data-video-id="${video.id}" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" data-playlist-action="down" data-playlist-id="${playlist.id}" data-video-id="${video.id}" ${index === playlistVideos.length - 1 ? 'disabled' : ''}>↓</button><button type="button" data-playlist-action="remove-video" data-playlist-id="${playlist.id}" data-video-id="${video.id}">×</button></div>`).join('') : '<p class="form-hint">Agrega videos desde el historial.</p>'}</div><div class="playlist-actions"><button type="button" data-playlist-action="play-all" data-playlist-id="${playlist.id}">▶ Reproducir todo</button><button type="button" data-playlist-action="add-video" data-playlist-id="${playlist.id}">＋ Agregar video</button><button type="button" data-playlist-action="edit" data-playlist-id="${playlist.id}">✏️ Editar</button><button type="button" data-playlist-action="share" data-playlist-id="${playlist.id}">↗ Compartir</button><button type="button" data-playlist-action="delete" data-playlist-id="${playlist.id}">🗑️ Eliminar</button></div></article>`;
  }).join('') : '<div class="notes-empty">Aún no tienes listas. Crea la primera para ordenar tus videos.</div>';

  playlistsGrid.querySelectorAll('.playlist-play-video').forEach((button) => button.addEventListener('click', () => {
    const video = history.find((item) => item.id === button.dataset.playVideo);
    if (video) openPlayer(video.id, video.title, video.author);
  }));
  playlistsGrid.querySelectorAll('[data-playlist-action]').forEach((button) => button.addEventListener('click', () => handlePlaylistAction(button.dataset.playlistAction, button.dataset.playlistId, button.dataset.videoId)));
}

function playPlaylist(playlist) {
  playlistQueue = playlist.videoIds.map((id) => history.find((video) => video.id === id)).filter(Boolean);
  playlistQueueIndex = 0;
  const firstVideo = playlistQueue[0];
  if (!firstVideo) { showToast('Esta lista no tiene videos'); return; }
  openPlayer(firstVideo.id, firstVideo.title, firstVideo.author);
  showToast(`Reproduciendo lista: ${playlist.title}`);
}

async function sharePlaylist(playlist) {
  const videoTitles = playlist.videoIds.map((id) => history.find((video) => video.id === id)?.title).filter(Boolean).join('\n');
  const text = `${playlist.title}\n${playlist.description || ''}\n\n${videoTitles}`;
  try { if (navigator.share) await navigator.share({ title: playlist.title, text }); else { await navigator.clipboard.writeText(text); showToast('Lista copiada para compartir'); } } catch (error) { if (error.name !== 'AbortError') showToast('No se pudo compartir la lista'); }
}

function handlePlaylistAction(action, playlistId, videoId) {
  const playlist = playlists.find((item) => item.id === playlistId);
  if (!playlist) return;
  if (action === 'play-all') return playPlaylist(playlist);
  if (action === 'edit') return openPlaylistEditor(playlist);
  if (action === 'add-video') return openPlaylistEditor(playlist);
  if (action === 'share') return sharePlaylist(playlist);
  if (action === 'delete') {
    if (!window.confirm('¿Eliminar esta lista de reproducción?')) return;
    playlists = playlists.filter((item) => item.id !== playlistId);
  } else if (action === 'remove-video') {
    playlist.videoIds = playlist.videoIds.filter((id) => id !== videoId);
  } else if (action === 'up' || action === 'down') {
    const index = playlist.videoIds.indexOf(videoId);
    const target = action === 'up' ? index - 1 : index + 1;
    if (index >= 0 && target >= 0 && target < playlist.videoIds.length) [playlist.videoIds[index], playlist.videoIds[target]] = [playlist.videoIds[target], playlist.videoIds[index]];
  }
  persistPlaylists();
  renderPlaylists();
}

function renderCards() {
  if (!videoGrid) return;
  videoGrid.innerHTML = history.length ? history.slice(0, 6).map((video) => `
    <article class="video-card" data-video-id="${video.id}" data-title="${video.title}" data-author="${video.author || 'YouTube'}">
      <button class="remove-video" type="button" data-video-id="${video.id}" aria-label="Eliminar ${video.title}">×</button>
      <div class="thumb" style="background-image: url('https://i.ytimg.com/vi/${video.id}/hqdefault.jpg'), ${video.color || 'linear-gradient(135deg, #1b4b78, #d34b76)'}">
        <span class="play-small"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 8 6-8 6V6Z"></path></svg></span><span class="card-time">${video.time || 'YouTube'}</span>
      </div><div class="card-content"><h3>${video.title}</h3><p>${video.author || 'YouTube'}</p></div></article>`).join('') : '<div class="empty-state">Todavía no tienes videos guardados. Pega un enlace para comenzar.</div>';

  document.querySelectorAll('.video-card').forEach((card) => card.addEventListener('click', (event) => {
    if (event.target.closest('.remove-video')) return;
    openPlayer(card.dataset.videoId, card.dataset.title, card.dataset.author);
  }));

  document.querySelectorAll('.remove-video').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      removeVideo(button.dataset.videoId);
    });
  });

}

function renderNotes() {
  if (!notesGrid) return;
  const query = notesViewState.query.toLowerCase();
  const filteredNotes = notes.filter((note) => {
    const haystack = `${note.title} ${note.videoTitle} ${note.content} ${note.tags || ''}`.toLowerCase();
    return (!query || haystack.includes(query)) && (!notesViewState.videoId || note.videoId === notesViewState.videoId);
  });
  const sortedNotes = filteredNotes.slice().sort((first, second) => {
    if (notesViewState.sort === 'title') return first.title.localeCompare(second.title, 'es');
    if (notesViewState.sort === 'video') return first.videoTitle.localeCompare(second.videoTitle, 'es');
    const firstDate = new Date(notesViewState.sort === 'created' ? first.createdAt : first.modifiedAt);
    const secondDate = new Date(notesViewState.sort === 'created' ? second.createdAt : second.modifiedAt);
    return notesViewState.sort === 'created' ? firstDate - secondDate : secondDate - firstDate;
  });
  notesCount.textContent = `${filteredNotes.length} ${filteredNotes.length === 1 ? 'nota' : 'notas'}`;
  notesGrid.innerHTML = sortedNotes.length ? sortedNotes.map((note) => `
    <article class="note-card" style="--note-color:${escapeHtml(note.color || '#ffd21a')}">
      <h3>${escapeHtml(note.title)}</h3>
      <p class="note-video">${escapeHtml(note.videoTitle)}</p>
      ${note.tags ? `<p class="note-tags">${note.tags.split(',').map((tag) => `<span>${escapeHtml(tag.trim())}</span>`).join('')}</p>` : ''}
      <div class="note-preview">${renderNoteContent(note.content, note.id)}</div>
      <p class="note-date">Modificada: ${formatDate(note.modifiedAt)}</p>
      <div class="note-actions"><button type="button" data-action="edit-note" data-note-id="${note.id}">✏️ Editar</button><button type="button" data-action="duplicate-note" data-note-id="${note.id}">⧉ Duplicar</button><button type="button" data-action="copy-note" data-note-id="${note.id}">▣ Copiar</button><button type="button" data-action="share-note" data-note-id="${note.id}">↗ Compartir</button><button type="button" data-action="delete-note" data-note-id="${note.id}">🗑️ Eliminar</button></div>
    </article>`).join('') : '<div class="notes-empty">No hay notas que coincidan.</div>';

  const videos = [...new Map(notes.map((note) => [note.videoId, note.videoTitle])).entries()].sort((first, second) => first[1].localeCompare(second[1], 'es'));
  notesVideoFilter.innerHTML = '<option value="">Todos los videos</option>' + videos.map(([id, title]) => `<option value="${escapeHtml(id)}">${escapeHtml(title)}</option>`).join('');
  notesVideoFilter.value = notesViewState.videoId;

  notesGrid.querySelectorAll('[data-action="edit-note"]').forEach((button) => button.addEventListener('click', () => {
    const note = notes.find((item) => item.id === button.dataset.noteId);
    if (note) openNoteEditor(note.videoId, note.videoTitle, note.videoChannel, note);
  }));
  notesGrid.querySelectorAll('[data-action="delete-note"]').forEach((button) => button.addEventListener('click', () => {
    pendingDeleteNoteId = button.dataset.noteId;
    deleteNoteModal.classList.add('open');
    deleteNoteModal.setAttribute('aria-hidden', 'false');
  }));
  notesGrid.querySelectorAll('[data-action="duplicate-note"]').forEach((button) => button.addEventListener('click', () => {
    const note = notes.find((item) => item.id === button.dataset.noteId);
    if (!note) return;
    const now = new Date().toISOString();
    notes.push({ ...note, id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`, title: `${note.title} (copia)`, createdAt: now, modifiedAt: now });
    persistNotes();
    renderNotes();
    showToast('Nota duplicada');
  }));
  notesGrid.querySelectorAll('[data-action="copy-note"]').forEach((button) => button.addEventListener('click', async () => {
    const note = notes.find((item) => item.id === button.dataset.noteId);
    if (!note) return;
    await navigator.clipboard.writeText(`${note.title}\n${note.videoTitle}\n\n${note.content}`);
    showToast('Nota copiada');
  }));
  notesGrid.querySelectorAll('[data-action="share-note"]').forEach((button) => button.addEventListener('click', () => {
    const note = notes.find((item) => item.id === button.dataset.noteId);
    if (note) shareNote(note);
  }));
  notesGrid.querySelectorAll('.timestamp-jump').forEach((button) => button.addEventListener('click', () => {
    const note = notes.find((item) => item.id === button.dataset.noteId);
    openPlayer(note?.videoId, note?.videoTitle, note?.videoChannel);
    window.setTimeout(() => sendYoutubeCommand('seekTo', [timestampToSeconds(button.dataset.timestamp), true]), 450);
  }));
  renderPlayerNotes(currentVideo?.id);
}

async function shareNote(note) {
  const shareText = `${note.title}\n${note.videoTitle}\n\n${note.content}`;
  const shareData = { title: note.title, text: shareText, url: `https://www.youtube.com/watch?v=${note.videoId}` };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(`${shareText}\n\n${shareData.url}`);
    showToast('Nota copiada para compartir');
  } catch (error) {
    if (error.name !== 'AbortError') showToast('No se pudo compartir la nota');
  }
}

function renderPlayerNotes(videoId) {
  if (!playerNotesPanel) return;
  const videoNotes = notes.filter((note) => note.videoId === videoId);
  playerNotesPanel.classList.toggle('has-notes', videoNotes.length > 0);
  playerNotesPanel.classList.remove('open');
  togglePlayerNotesButton.setAttribute('aria-expanded', 'false');
  playerNotesPanel.innerHTML = videoNotes.length ? `<span class="player-notes-title">📝 Notas del video</span>${videoNotes.map((note) => `<div class="player-note-item"><strong>${escapeHtml(note.title)}</strong><div>${renderNoteContent(note.content, note.id)}</div></div>`).join('')}` : '';
  playerNotesPanel.querySelectorAll('.timestamp-jump').forEach((button) => button.addEventListener('click', () => {
    sendYoutubeCommand('seekTo', [timestampToSeconds(button.dataset.timestamp), true]);
    showToast(`Video: ${button.dataset.timestamp}`);
  }));
}

function openNoteEditor(videoId, videoTitle, videoChannel = 'YouTube', note = null) {
  const draft = !note && minimizedNoteDraft?.videoId === videoId ? minimizedNoteDraft : null;
  currentVideo = { id: videoId, title: videoTitle, channel: videoChannel };
  editingNoteId = note?.id || draft?.editingNoteId || null;
  noteDialogTitle.textContent = note || draft?.editingNoteId ? 'Editar nota' : 'Nueva nota';
  noteVideoName.textContent = videoTitle || 'Video de YouTube';
  noteTitle.value = note?.title || draft?.title || '';
  noteContent.value = note?.content || draft?.content || '';
  noteTags.value = note?.tags || draft?.tags || '';
  noteColor.value = note?.color || draft?.color || '#ffd21a';
  minimizedNoteDraft = null;
  noteModal.classList.add('open');
  noteModal.setAttribute('aria-hidden', 'false');
  noteTitle.focus();
}

function closeNoteEditor() {
  noteModal.classList.remove('open');
  noteModal.setAttribute('aria-hidden', 'true');
  editingNoteId = null;
}

function minimizeNoteEditor() {
  minimizedNoteDraft = { videoId: currentVideo?.id, title: noteTitle.value, content: noteContent.value, tags: noteTags.value, color: noteColor.value, editingNoteId };
  closeNoteEditor();
  showToast('Nota minimizada. Puedes seguir viendo el video.');
}

function closeSharedNoteEditor() {
  sharedNoteModal.classList.remove('open');
  sharedNoteModal.setAttribute('aria-hidden', 'true');
}

function closeDeleteNoteModal() {
  deleteNoteModal.classList.remove('open');
  deleteNoteModal.setAttribute('aria-hidden', 'true');
  pendingDeleteNoteId = null;
}

function deletePendingNote() {
  if (!pendingDeleteNoteId) return;
  notes = notes.filter((note) => note.id !== pendingDeleteNoteId);
  persistNotes();
  renderNotes();
  closeDeleteNoteModal();
  showToast('Nota eliminada');
}

function setMenuOpen(isOpen) {
  sideMenu.classList.toggle('open', isOpen);
  menuBackdrop.classList.toggle('open', isOpen);
  sideMenu.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

function syncView() {
  const hash = window.location.hash;
  document.querySelector('.app-shell').classList.toggle('notes-view', hash === '#misNotas');
  document.querySelector('.app-shell').classList.toggle('playlists-view', hash === '#playlists');
}

function removeVideo(videoId) {
  history = history.filter((video) => video.id !== videoId);
  persistHistory();
  renderCards();
  showToast('Video quitado del historial');
}

function parseVideoId(value) {
  const clean = value.trim();
  if (/^[\w-]{11}$/.test(clean)) return clean;
  try {
    const url = new URL(clean);
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).split('/')[0];
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v') || url.pathname.split('/').pop();
  } catch (error) { return null; }
  return null;
}

function openPlayer(id, title = 'Video de YouTube', channel = 'Canal de YouTube') {
  if (!id || !/^[\w-]{11}$/.test(id)) return;
  clearVideoTimer();
  currentVideo = { id, title: title || 'Video de YouTube', channel: channel || 'Canal de YouTube' };
  currentVideoTime = 0;
  hasReceivedVideoTime = false;
  youtubeFrame.src = `https://www.youtube.com/embed/${id}?controls=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`;
  watchOnYoutube.href = `https://www.youtube.com/watch?v=${id}`;
  playerTitle.textContent = title || 'Video de YouTube';
  if (playerChannel) playerChannel.textContent = channel || 'Canal de YouTube';
  renderPlayerNotes(id);
  playerModal.classList.add('open');
  playerModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function initializeYoutubeMessaging() {
  youtubeFrame.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'alxplay-player', channel: 'alxplay' }), '*');
}

async function refreshVideoDetails(videoId, fallbackTitle = 'Video personalizado', fallbackChannel = 'Canal de YouTube') {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, { cache: 'no-store' });
    if (!response.ok) return { title: fallbackTitle, channel: fallbackChannel };
    const data = await response.json();
    const title = data.title || fallbackTitle;
    const channel = data.author_name || fallbackChannel;
    const itemIndex = history.findIndex((video) => video.id === videoId);
    if (itemIndex >= 0) {
      history[itemIndex] = { ...history[itemIndex], title, author: channel };
      persistHistory();
    } else {
      history = [{ id: videoId, title, author: channel, time: 'YouTube', color: 'linear-gradient(135deg, #1c4178, #6339a7)' }, ...history];
      persistHistory();
    }
    renderCards();
    if (playerTitle && playerTitle.textContent === fallbackTitle) {
      playerTitle.textContent = title;
    }
    if (playerChannel && playerChannel.textContent === fallbackChannel) {
      playerChannel.textContent = channel;
    }
    if (currentVideo?.id === videoId) currentVideo = { ...currentVideo, title, channel };
    return { title, channel };
  } catch (error) {
    return { title: fallbackTitle, channel: fallbackChannel };
  }
}

function closePlayer() {
  clearVideoTimer();
  playerModal.classList.remove('open');
  playerModal.setAttribute('aria-hidden', 'true');
  youtubeFrame.src = '';
  document.body.style.overflow = '';
}

function clearVideoTimer() {
  if (videoTimer) window.clearTimeout(videoTimer);
  if (videoTimerInterval) window.clearInterval(videoTimerInterval);
  videoTimer = null;
  videoTimerInterval = null;
  if (videoTimerStatus) videoTimerStatus.textContent = '';
  if (videoTimerButton) {
    videoTimerButton.textContent = 'Activar';
    videoTimerButton.classList.remove('active');
  }
}

function toggleVideoTimer() {
  if (videoTimer) {
    clearVideoTimer();
    showToast('Temporizador cancelado');
    return;
  }
  const minutes = Number(videoTimerMinutes.value);
  if (!Number.isInteger(minutes) || minutes < 15 || minutes > 180 || minutes % 15 !== 0) {
    videoTimerMinutes.focus();
    showToast('Elige 15, 30, 45... hasta 180 minutos');
    return;
  }
  let remainingSeconds = minutes * 60;
  const updateTimerStatus = () => {
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const seconds = String(remainingSeconds % 60).padStart(2, '0');
    videoTimerStatus.textContent = `Se detendrá en ${remainingMinutes}:${seconds}`;
  };
  updateTimerStatus();
  videoTimerInterval = window.setInterval(() => {
    remainingSeconds -= 1;
    updateTimerStatus();
    if (remainingSeconds <= 0) {
      clearVideoTimer();
      sendYoutubeCommand('pauseVideo');
      showToast('Video pausado por el temporizador');
    }
  }, 1000);
  videoTimer = window.setTimeout(() => {
    clearVideoTimer();
    sendYoutubeCommand('pauseVideo');
    showToast('Video pausado por el temporizador');
  }, minutes * 60 * 1000);
  videoTimerButton.textContent = 'Cancelar';
  videoTimerButton.classList.add('active');
  showToast(`Temporizador activado: ${minutes} min`);
}

function sendYoutubeCommand(command, args = []) {
  youtubeFrame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args, id: 'alxplay-player', channel: 'alxplay' }), '*');
}

function saveCurrentTimestamp() {
  if (!currentVideo) return;
  const marker = `${formatTimestamp(currentVideoTime)} — `;
  noteContent.value = `${noteContent.value.trimEnd()}${noteContent.value.trim() ? '\n' : ''}${marker}`;
  noteContent.focus();
  showToast(`Marca ${formatTimestamp(currentVideoTime)} añadida`);
}

function addCurrentTimestamp() {
  if (!currentVideo) return;
  timestampRequestPending = true;
  sendYoutubeCommand('getCurrentTime');
  window.setTimeout(() => {
    if (timestampRequestPending) {
      timestampRequestPending = false;
      if (hasReceivedVideoTime) saveCurrentTimestamp();
      else showToast('No pudimos obtener el tiempo del video. Inténtalo de nuevo.');
    }
  }, 800);
}

function insertManualTimestamp() {
  const parts = noteTimestampSeconds.value.trim().split(':').map(Number);
  const isValid = parts.length === 3 && parts.every((part) => Number.isInteger(part) && part >= 0) && parts[1] < 60 && parts[2] < 60;
  if (!isValid) {
    showToast('Usa el formato HH:MM:SS');
    noteTimestampSeconds.focus();
    return;
  }
  const seconds = (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  const marker = `${formatTimestamp(seconds)} — `;
  noteContent.value = `${noteContent.value.trimEnd()}${noteContent.value.trim() ? '\n' : ''}${marker}`;
  noteTimestampSeconds.value = '';
  noteContent.focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = parseVideoId(videoInput.value);
  if (!id) { formMessage.textContent = 'No encontramos un ID válido. Prueba con un enlace de YouTube.'; formMessage.style.color = '#ff8f9b'; return; }
  const existing = history.find((video) => video.id === id);
  const fallbackTitle = existing?.title || 'Video personalizado';
  const fallbackChannel = existing?.author || 'Canal de YouTube';
  const video = existing || { id, title: 'Cargando título...', author: 'Cargando canal...', time: 'YouTube', color: 'linear-gradient(135deg, #1c4178, #6339a7)' };
  history = [video, ...history.filter((item) => item.id !== id)];
  persistHistory();
  renderCards();
  openPlayer(id, video.title || fallbackTitle, video.author || fallbackChannel);
  videoInput.value = '';
  formMessage.textContent = 'Video listo para reproducir.';
  formMessage.style.color = '#10c9f4';
  const details = await refreshVideoDetails(id, fallbackTitle, fallbackChannel);
  if (details.title && playerTitle.textContent === 'Cargando título...') {
    playerTitle.textContent = details.title;
  }
  if (details.channel && playerChannel && playerChannel.textContent === 'Cargando canal...') {
    playerChannel.textContent = details.channel;
  }
});

document.querySelector('#closePlayer').addEventListener('click', closePlayer);
if (clearAllHistory) {
  clearAllHistory.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('alxplay-history');
    renderCards();
    showToast('Historial limpiado');
  });
}
document.querySelector('#videoPlayButton').addEventListener('click', () => sendYoutubeCommand('playVideo'));
document.querySelector('#videoPauseButton').addEventListener('click', () => sendYoutubeCommand('pauseVideo'));
document.querySelector('#videoMuteButton').addEventListener('click', (event) => { const muted = event.currentTarget.dataset.muted === 'true'; sendYoutubeCommand(muted ? 'unMute' : 'mute'); event.currentTarget.dataset.muted = String(!muted); event.currentTarget.textContent = muted ? '🔊 Silenciar' : '🔇 Activar sonido'; });
document.querySelector('#videoBackButton')?.addEventListener('click', () => sendYoutubeCommand('seekTo', [0, true]));
document.querySelector('#videoForwardButton')?.addEventListener('click', () => sendYoutubeCommand('seekTo', [10, true]));
document.querySelector('#videoFullscreenButton').addEventListener('click', () => { if (youtubeFrame.requestFullscreen) youtubeFrame.requestFullscreen(); });
document.querySelector('#videoVolume').addEventListener('input', (event) => sendYoutubeCommand('setVolume', [Number(event.target.value)]));
videoTimerButton.addEventListener('click', toggleVideoTimer);
videoTimerMinutes.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); toggleVideoTimer(); } });
document.querySelector('#openPlayerNoteButton').addEventListener('click', () => {
  if (currentVideo) openNoteEditor(currentVideo.id, currentVideo.title, currentVideo.channel);
});
togglePlayerNotesButton.addEventListener('click', () => {
  if (!playerNotesPanel.classList.contains('has-notes')) {
    showToast('Este video no tiene notas');
    return;
  }
  const isOpen = playerNotesPanel.classList.toggle('open');
  togglePlayerNotesButton.setAttribute('aria-expanded', String(isOpen));
});
insertTimestampButton.addEventListener('click', insertManualTimestamp);
noteTimestampSeconds.addEventListener('input', () => {
  const digits = noteTimestampSeconds.value.replace(/\D/g, '').slice(0, 6);
  noteTimestampSeconds.value = (digits.match(/.{1,2}/g) || []).join(':');
});
noteTimestampSeconds.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); insertManualTimestamp(); } });
document.querySelector('#shareButton').addEventListener('click', async () => { try { await navigator.clipboard.writeText(youtubeFrame.src); showToast('Enlace copiado'); } catch (error) { showToast('El enlace está listo para compartir'); } });
noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!currentVideo) return;
  const wasEditing = Boolean(editingNoteId);
  const now = new Date().toISOString();
  if (editingNoteId) {
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    if (noteIndex >= 0) notes[noteIndex] = { ...notes[noteIndex], title: noteTitle.value.trim(), content: noteContent.value.trim(), tags: noteTags.value.trim(), color: noteColor.value, modifiedAt: now };
  } else {
    notes.push({ id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`, videoId: currentVideo.id, videoTitle: currentVideo.title, videoChannel: currentVideo.channel, title: noteTitle.value.trim(), content: noteContent.value.trim(), tags: noteTags.value.trim(), color: noteColor.value, createdAt: now, modifiedAt: now });
  }
  persistNotes();
  renderNotes();
  minimizedNoteDraft = null;
  closeNoteEditor();
  showToast(wasEditing ? 'Nota actualizada' : 'Nota guardada');
});
document.querySelector('#closeNote').addEventListener('click', closeNoteEditor);
document.querySelector('#cancelNote').addEventListener('click', closeNoteEditor);
minimizeNoteButton.addEventListener('click', minimizeNoteEditor);
document.querySelector('#newPlaylistButton').addEventListener('click', () => openPlaylistEditor());
document.querySelector('#closePlaylist').addEventListener('click', closePlaylistEditor);
document.querySelector('#cancelPlaylist').addEventListener('click', closePlaylistEditor);
playlistForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const videoIds = [...playlistVideoPicker.querySelectorAll('input:checked')].map((input) => input.value);
  const now = new Date().toISOString();
  const wasEditing = Boolean(editingPlaylistId);
  if (editingPlaylistId) {
    const playlist = playlists.find((item) => item.id === editingPlaylistId);
    if (playlist) Object.assign(playlist, { title: playlistTitle.value.trim(), description: playlistDescription.value.trim(), videoIds, modifiedAt: now });
  } else {
    playlists.push({ id: `playlist-${Date.now()}-${Math.random().toString(36).slice(2)}`, title: playlistTitle.value.trim(), description: playlistDescription.value.trim(), videoIds, createdAt: now, modifiedAt: now });
  }
  persistPlaylists();
  renderPlaylists();
  closePlaylistEditor();
  window.location.hash = '#playlists';
  showToast(wasEditing ? 'Lista actualizada' : 'Lista creada');
});
notesSearch.addEventListener('input', (event) => { notesViewState.query = event.target.value; renderNotes(); });
notesVideoFilter.addEventListener('change', (event) => { notesViewState.videoId = event.target.value; renderNotes(); });
notesSort.addEventListener('change', (event) => { notesViewState.sort = event.target.value; renderNotes(); });
exportNotesButton.addEventListener('click', () => {
  const file = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = `alxplay-notas-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Notas exportadas');
});
importNotesButton.addEventListener('click', () => importNotesInput.click());
importNotesInput.addEventListener('change', () => {
  const file = importNotesInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error('Formato inválido');
      const existingIds = new Set(notes.map((note) => note.id));
      const validNotes = imported.filter((note) => note && note.videoId && note.title && note.content).map((note) => ({ ...note, id: existingIds.has(note.id) ? `note-${Date.now()}-${Math.random().toString(36).slice(2)}` : note.id, tags: note.tags || '', color: note.color || '#ffd21a', createdAt: note.createdAt || new Date().toISOString(), modifiedAt: note.modifiedAt || new Date().toISOString() }));
      ensureVideosForNotes(validNotes);
      notes = [...notes, ...validNotes];
      persistNotes();
      renderNotes();
      showToast(`${validNotes.length} notas importadas`);
    } catch (error) { showToast('El archivo de notas no es válido'); }
    importNotesInput.value = '';
  };
  reader.readAsText(file);
});
menuButton.addEventListener('click', () => setMenuOpen(!sideMenu.classList.contains('open')));
closeMenuButton.addEventListener('click', () => setMenuOpen(false));
menuBackdrop.addEventListener('click', () => setMenuOpen(false));
document.querySelectorAll('.side-menu-nav a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
if (openSharedNotesInline) {
  openSharedNotesInline.addEventListener('click', () => {
    sharedNoteModal.classList.add('open');
    sharedNoteModal.setAttribute('aria-hidden', 'false');
    sharedNoteContent.focus();
  });
}
document.querySelector('#closeSharedNote').addEventListener('click', closeSharedNoteEditor);
document.querySelector('#cancelSharedNote').addEventListener('click', closeSharedNoteEditor);
document.querySelector('#closeDeleteNote').addEventListener('click', closeDeleteNoteModal);
document.querySelector('#cancelDeleteNote').addEventListener('click', closeDeleteNoteModal);
confirmDeleteNoteButton.addEventListener('click', deletePendingNote);
sharedNoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const rawContent = sharedNoteContent.value.trim();
  const urlMatch = rawContent.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]{11}|youtu\.be\/[\w-]{11})/i);
  const videoId = urlMatch ? parseVideoId(urlMatch[0]) : null;
  if (!videoId) {
    showToast('La nota debe incluir un enlace de YouTube válido');
    return;
  }
  const contentWithoutUrl = rawContent.replace(urlMatch[0], '').trim();
  const lines = contentWithoutUrl.split(/\r?\n/);
  const title = lines.shift()?.trim() || 'Nota compartida';
  const videoTitle = lines.shift()?.trim() || 'Video de YouTube';
  const content = lines.join('\n').trim() || videoTitle;
  const now = new Date().toISOString();
  const sharedNote = { id: `note-${Date.now()}-${Math.random().toString(36).slice(2)}`, videoId, videoTitle, videoChannel: 'YouTube', title, content, createdAt: now, modifiedAt: now };
  ensureVideosForNotes([sharedNote]);
  notes.push(sharedNote);
  persistNotes();
  renderNotes();
  sharedNoteContent.value = '';
  closeSharedNoteEditor();
  window.location.hash = '#misNotas';
  showToast('Nota compartida agregada');
  refreshVideoDetails(videoId, videoTitle, 'YouTube');
});
window.addEventListener('hashchange', syncView);
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://www.youtube.com') return;
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    const time = Number(data?.info?.currentTime);
    if (Number.isFinite(time)) {
      currentVideoTime = time;
      hasReceivedVideoTime = true;
      if (timestampRequestPending) {
        timestampRequestPending = false;
        saveCurrentTimestamp();
      }
    }
    if (data?.event === 'onReady') {
      sendYoutubeCommand('addEventListener', ['onStateChange']);
      sendYoutubeCommand('getCurrentTime');
    }
    if (Number(data?.info?.playerState) === 0 && playlistQueue.length && playlistQueueIndex < playlistQueue.length - 1) {
      playlistQueueIndex += 1;
      const nextVideo = playlistQueue[playlistQueueIndex];
      openPlayer(nextVideo.id, nextVideo.title, nextVideo.author);
    }
  } catch (error) { /* YouTube can send non-JSON messages. */ }
});
youtubeFrame.addEventListener('load', initializeYoutubeMessaging);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { if (noteModal.classList.contains('open')) closeNoteEditor(); else if (sharedNoteModal.classList.contains('open')) closeSharedNoteEditor(); else if (deleteNoteModal.classList.contains('open')) closeDeleteNoteModal(); else if (playlistModal.classList.contains('open')) closePlaylistEditor(); else if (sideMenu.classList.contains('open')) setMenuOpen(false); else closePlayer(); } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); videoInput.focus(); } });
renderCards();
renderNotes();
renderPlaylists();
syncView();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  });
}
