const videoGrid = document.querySelector('#videoGrid');
const historySearch = document.querySelector('#historySearch');
const favoritesOnly = document.querySelector('#favoritesOnly');
const searchHistoryList = document.querySelector('#searchHistoryList');
const remindersList = document.querySelector('#remindersList');
const statsPeriod = document.querySelector('#statsPeriod');
const exportFavoritesButton = document.querySelector('#exportFavoritesButton');
const exportProgressButton = document.querySelector('#exportProgressButton');
const trashGrid = document.querySelector('#trashGrid');
const emptyTrashButton = document.querySelector('#emptyTrashButton');
const form = document.querySelector('#videoForm');
const videoInput = document.querySelector('#videoInput');
const formMessage = document.querySelector('#formMessage');
const youtubeResults = document.querySelector('#youtubeResults');
const youtubeResultsToolbar = document.querySelector('#youtubeResultsToolbar');
const clearSearchInput = document.querySelector('#clearSearchInput');
const searchYoutubeButton = document.querySelector('#searchYoutubeButton');
const addVideoButton = document.querySelector('#addVideoButton');
const addVideoModal = document.querySelector('#addVideoModal');
const addVideoThumbnail = document.querySelector('#addVideoThumbnail');
const addVideoTitle = document.querySelector('#addVideoTitle');
const addVideoChannel = document.querySelector('#addVideoChannel');
const confirmAddVideo = document.querySelector('#confirmAddVideo');
const closeAddVideo = document.querySelector('#closeAddVideo');
const cancelAddVideo = document.querySelector('#cancelAddVideo');
let pendingHistoryVideo = null;
const YOUTUBE_API_KEY = 'AIzaSyAdWCshIo_t5t0DY81QtGbJIGbQwN__sws';
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
const confirmActionModal = document.querySelector('#confirmActionModal');
const confirmActionTitle = document.querySelector('#confirmActionTitle');
const confirmActionMessage = document.querySelector('#confirmActionMessage');
const confirmActionButton = document.querySelector('#confirmActionButton');
const closeConfirmAction = document.querySelector('#closeConfirmAction');
const cancelConfirmAction = document.querySelector('#cancelConfirmAction');
let pendingDeleteNoteId = null;
let pendingConfirmation = null;
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
const playlistTags = document.querySelector('#playlistTags');
const playlistVideoPicker = document.querySelector('#playlistVideoPicker');
const playlistSearch = document.querySelector('#playlistSearch');
const playlistSort = document.querySelector('#playlistSort');
const exportPlaylistsButton = document.querySelector('#exportPlaylistsButton');
const importPlaylistsButton = document.querySelector('#importPlaylistsButton');
const importPlaylistsInput = document.querySelector('#importPlaylistsInput');
const playerFavoriteButton = document.querySelector('#playerFavoriteButton');
const playerProgressBar = document.querySelector('#playerProgressBar');
const playerProgressLabel = document.querySelector('#playerProgressLabel');
const playerMoreMenu = document.querySelector('#playerMoreMenu');
const playerNoteMenu = document.querySelector('#playerNoteMenu');
const createVideoNoteButton = document.querySelector('#createVideoNoteButton');
const videoToggleButton = document.querySelector('#videoToggleButton');
const playbackRate = document.querySelector('#playbackRate');
const autoplayNext = document.querySelector('#autoplayNext');
const addQueueButton = document.querySelector('#addQueueButton');
const quickMarkerButton = document.querySelector('#quickMarkerButton');
const queueActionMenu = document.querySelector('#queueActionMenu');
const markerActionMenu = document.querySelector('#markerActionMenu');
const queuePanel = document.querySelector('#queuePanel');
const markerModal = document.querySelector('#markerModal');
const markerForm = document.querySelector('#markerForm');
const markerTitle = document.querySelector('#markerTitle');
const markerTime = document.querySelector('#markerTime');
const markerVideoName = document.querySelector('#markerVideoName');
const markersViewModal = document.querySelector('#markersViewModal');
const markersViewVideoName = document.querySelector('#markersViewVideoName');
const savedMarkersList = document.querySelector('#savedMarkersList');
const noteMarkerPicker = document.querySelector('#noteMarkerPicker');
const queueList = document.querySelector('#queueList');
const clearQueueButton = document.querySelector('#clearQueueButton');
const closeQueueButton = document.querySelector('#closeQueueButton');
const reminderDate = document.querySelector('#reminderDate');
const reminderButton = document.querySelector('#reminderButton');
const statsWatchTime = document.querySelector('#statsWatchTime');
const statsCompleted = document.querySelector('#statsCompleted');
const statsFavorites = document.querySelector('#statsFavorites');
const statsSaved = document.querySelector('#statsSaved');
const backupAllButton = document.querySelector('#backupAllButton');
const restoreAllButton = document.querySelector('#restoreAllButton');
const restoreAllInput = document.querySelector('#restoreAllInput');
const clearSearchHistoryButton = document.querySelector('#clearSearchHistoryButton');
const settingsButton = document.querySelector('#settingsButton');
const settingsPopover = document.querySelector('#settingsPopover');
const cardOutlineColor = document.querySelector('#cardOutlineColor');
const resetCardOutline = document.querySelector('#resetCardOutline');
const cardOutlineColorDesktop = document.querySelector('#cardOutlineColorDesktop');
const resetCardOutlineDesktop = document.querySelector('#resetCardOutlineDesktop');
let playlists = JSON.parse(localStorage.getItem('alxplay-playlists') || '[]');
let editingPlaylistId = null;
let playlistQueue = [];
let playlistQueueIndex = 0;
let markers = JSON.parse(localStorage.getItem('alxplay-markers') || '{}');
if (!markers || Array.isArray(markers)) markers = {};
let pendingMarkerSeconds = 0;
const savedNotes = JSON.parse(localStorage.getItem('alxplay-notes') || '[]');
let notes = Array.isArray(savedNotes) ? savedNotes : [];
let currentVideo = null;
let currentVideoTime = 0;
let currentVideoDuration = 0;
let hasReceivedVideoTime = false;
let timestampRequestPending = false;
let markerRequestPending = false;
let editingNoteId = null;
let minimizedNoteDraft = null;
let videoTimer = null;
let videoTimerInterval = null;
let notesViewState = { query: '', videoId: '', sort: 'modified' };
let historyViewState = { query: '', favoritesOnly: false };
let playlistsViewState = { query: '', sort: 'modified' };
let searchHistory = JSON.parse(localStorage.getItem('alxplay-search-history') || '[]');
let reminders = JSON.parse(localStorage.getItem('alxplay-reminders') || '[]');
let stats = JSON.parse(localStorage.getItem('alxplay-stats') || '{"watchedSeconds":0,"completed":0}');
let trash = JSON.parse(localStorage.getItem('alxplay-trash') || '[]');
let deletedNotes = JSON.parse(localStorage.getItem('alxplay-deleted-notes') || '[]');
let statsPeriodValue = 'all';
let lastProgressTick = 0;
const clearAllHistory = document.querySelector('#clearAllHistory');
const savedHistory = JSON.parse(localStorage.getItem('alxplay-history') || 'null') || [];
const videoProgress = JSON.parse(localStorage.getItem('alxplay-progress') || '{}');
const savedFavorites = JSON.parse(localStorage.getItem('alxplay-favorites') || '[]');
let favoriteVideoIds = new Set(Array.isArray(savedFavorites) ? savedFavorites : []);
const autoplayPreference = localStorage.getItem('alxplay-autoplay') !== 'false';
autoplayNext.checked = autoplayPreference;
document.documentElement.dataset.theme = localStorage.getItem('alxplay-theme') || 'dark';
const savedCardOutline = localStorage.getItem('alxplay-card-outline') || '#ff2b2b';
document.documentElement.style.setProperty('--card-outline', savedCardOutline);
cardOutlineColor.value = savedCardOutline;
cardOutlineColorDesktop.value = savedCardOutline;
const starterVideoIds = new Set(['dQw4w9WgXcQ', 'M7lc1UVf-VE', 'ysz5S6PUM-U']);
let history = savedHistory.filter((video) => !starterVideoIds.has(video.id));
if (history.length !== savedHistory.length) {
  localStorage.setItem('alxplay-history', JSON.stringify(history));
}

playlists = playlists.map((playlist) => {
  const videoIds = Array.isArray(playlist.videoIds) ? playlist.videoIds : [];
  const storedVideos = Array.isArray(playlist.videos) ? playlist.videos : [];
  const videos = videoIds.map((id) => storedVideos.find((video) => video.id === id) || history.find((video) => video.id === id)).filter(Boolean);
  return { ...playlist, videoIds, videos };
});
localStorage.setItem('alxplay-playlists', JSON.stringify(playlists));

function persistHistory() {
  localStorage.setItem('alxplay-history', JSON.stringify(history));
}

function persistNotes() {
  localStorage.setItem('alxplay-notes', JSON.stringify(notes));
}

function persistPlaylists() {
  localStorage.setItem('alxplay-playlists', JSON.stringify(playlists));
}

function persistFavorites() {
  localStorage.setItem('alxplay-favorites', JSON.stringify([...favoriteVideoIds]));
}

function persistStats() {
  localStorage.setItem('alxplay-stats', JSON.stringify(stats));
}

function getStatsForPeriod() {
  const activity = Array.isArray(stats.activity) ? stats.activity : [];
  if (statsPeriodValue === 'all') return { watchedSeconds: stats.watchedSeconds || 0, completed: stats.completed || 0 };
  const now = new Date();
  const cutoff = new Date(now);
  if (statsPeriodValue === 'today') cutoff.setHours(0, 0, 0, 0);
  if (statsPeriodValue === 'week') cutoff.setDate(now.getDate() - 7);
  if (statsPeriodValue === 'month') cutoff.setDate(now.getDate() - 30);
  return activity.filter((item) => new Date(item.date) >= cutoff).reduce((total, item) => ({ watchedSeconds: total.watchedSeconds + (item.watchedSeconds || 0), completed: total.completed + (item.completed || 0) }), { watchedSeconds: 0, completed: 0 });
}

function addStatsActivity(watchedSeconds = 0, completed = 0) {
  const date = new Date().toISOString();
  stats.watchedSeconds = (stats.watchedSeconds || 0) + watchedSeconds;
  stats.completed = (stats.completed || 0) + completed;
  stats.activity = [...(stats.activity || []), { date, watchedSeconds, completed }].slice(-500);
  persistStats();
}

function formatWatchTime(seconds) {
  return formatTimestamp(seconds);
}

function renderStats() {
  const periodStats = getStatsForPeriod();
  statsWatchTime.textContent = formatWatchTime(periodStats.watchedSeconds);
  statsCompleted.textContent = String(periodStats.completed);
  statsFavorites.textContent = String(favoriteVideoIds.size);
  statsSaved.textContent = String(history.length);
  searchHistoryList.innerHTML = searchHistory.length ? searchHistory.map((term) => `<button type="button" data-search-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`).join('') : '<span class="form-hint">Todavía no hay búsquedas.</span>';
  searchHistoryList.querySelectorAll('[data-search-term]').forEach((button) => button.addEventListener('click', () => { videoInput.value = button.dataset.searchTerm; videoInput.focus(); }));
  remindersList.innerHTML = reminders.length ? reminders.map((item) => `<span>${escapeHtml(item.title)} · ${formatDate(item.date)}</span>`).join('') : '<span class="form-hint">No hay recordatorios.</span>';
}

function renderQueue() {
  queueList.innerHTML = playlistQueue.length ? playlistQueue.map((video, index) => `<div class="queue-row"><button type="button" data-queue-play="${escapeHtml(video.id)}">${index === playlistQueueIndex ? '▶' : '○'}</button><span>${escapeHtml(video.title)}</span><button type="button" data-queue-up="${index}" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" data-queue-down="${index}" ${index === playlistQueue.length - 1 ? 'disabled' : ''}>↓</button><button type="button" data-queue-remove="${index}">×</button></div>`).join('') : '<span class="form-hint">La cola está vacía.</span>';
  queueList.querySelectorAll('[data-queue-play]').forEach((button) => button.addEventListener('click', () => { const video = playlistQueue.find((item) => item.id === button.dataset.queuePlay); if (video) openPlayer(video.id, video.title, video.author); }));
  queueList.querySelectorAll('[data-queue-up]').forEach((button) => button.addEventListener('click', () => moveQueue(Number(button.dataset.queueUp), -1)));
  queueList.querySelectorAll('[data-queue-down]').forEach((button) => button.addEventListener('click', () => moveQueue(Number(button.dataset.queueDown), 1)));
  queueList.querySelectorAll('[data-queue-remove]').forEach((button) => button.addEventListener('click', () => { playlistQueue.splice(Number(button.dataset.queueRemove), 1); renderQueue(); }));
}

function persistMarkers() {
  localStorage.setItem('alxplay-markers', JSON.stringify(markers));
}

function getVideoMarkers(videoId) {
  return Array.isArray(markers[videoId]) ? markers[videoId] : [];
}

function closeActionMenus() {
  [queueActionMenu, markerActionMenu].forEach((menu) => {
    if (menu.contains(document.activeElement)) document.activeElement.blur();
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
  });
  addQueueButton.setAttribute('aria-expanded', 'false');
  quickMarkerButton.setAttribute('aria-expanded', 'false');
}

function toggleActionMenu(menu, button) {
  const isOpen = menu.classList.toggle('open');
  closePlayerNoteMenu();
  closePlayerMoreMenu();
  [queueActionMenu, markerActionMenu].filter((item) => item !== menu).forEach((item) => {
    item.classList.remove('open');
    item.setAttribute('aria-hidden', 'true');
  });
  menu.setAttribute('aria-hidden', String(!isOpen));
  button.setAttribute('aria-expanded', String(isOpen));
}

function renderNoteMarkerPicker(videoId) {
  const videoMarkers = getVideoMarkers(videoId);
  noteMarkerPicker.innerHTML = videoMarkers.length ? videoMarkers.map((marker) => `<button type="button" data-note-marker="${escapeHtml(marker.id)}"><span>${escapeHtml(marker.time)}</span>${escapeHtml(marker.title)}</button>`).join('') : '<span class="form-hint">Aún no hay marcas guardadas.</span>';
  noteMarkerPicker.querySelectorAll('[data-note-marker]').forEach((button) => button.addEventListener('click', () => {
    const marker = videoMarkers.find((item) => item.id === button.dataset.noteMarker);
    if (!marker) return;
    const markerLine = `${marker.time} — ${marker.title}`;
    noteContent.value = `${noteContent.value.trimEnd()}${noteContent.value.trim() ? '\n' : ''}${markerLine}`;
    noteContent.focus();
  }));
}

function renderSavedMarkers() {
  if (!currentVideo) return;
  const videoMarkers = getVideoMarkers(currentVideo.id);
  markersViewVideoName.textContent = currentVideo.title || 'Video de YouTube';
  savedMarkersList.innerHTML = videoMarkers.length ? videoMarkers.map((marker) => `<button type="button" class="saved-marker-row" data-seek-marker="${escapeHtml(marker.time)}"><strong>${escapeHtml(marker.title)}</strong><span>${escapeHtml(marker.time)}</span></button>`).join('') : '<p class="form-hint">Este video todavía no tiene marcas.</p>';
  savedMarkersList.querySelectorAll('[data-seek-marker]').forEach((button) => button.addEventListener('click', () => {
    sendYoutubeCommand('seekTo', [timestampToSeconds(button.dataset.seekMarker), true]);
    closeMarkersView();
  }));
}

function openMarkersView() {
  closeActionMenus();
  renderSavedMarkers();
  markersViewModal.classList.add('open');
  markersViewModal.setAttribute('aria-hidden', 'false');
}

function closeMarkersView() {
  markersViewModal.classList.remove('open');
  markersViewModal.setAttribute('aria-hidden', 'true');
}

function closeQueue() {
  queuePanel.classList.remove('open');
}

function openMarkerEditor(seconds) {
  if (!currentVideo) return;
  closeActionMenus();
  pendingMarkerSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
  markerVideoName.textContent = currentVideo.title || 'Video de YouTube';
  markerTime.textContent = `Momento: ${formatTimestamp(pendingMarkerSeconds)}`;
  markerTitle.value = '';
  markerModal.classList.add('open');
  markerModal.setAttribute('aria-hidden', 'false');
  markerTitle.focus();
}

function closeMarkerEditor() {
  markerModal.classList.remove('open');
  markerModal.setAttribute('aria-hidden', 'true');
}

function moveQueue(index, offset) {
  const target = index + offset;
  if (target < 0 || target >= playlistQueue.length) return;
  [playlistQueue[index], playlistQueue[target]] = [playlistQueue[target], playlistQueue[index]];
  renderQueue();
}

function recordSearch(term) {
  const cleanTerm = term.trim();
  if (!cleanTerm) return;
  searchHistory = [cleanTerm, ...searchHistory.filter((item) => item.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 15);
  localStorage.setItem('alxplay-search-history', JSON.stringify(searchHistory));
  renderStats();
}

function saveReminder() {
  if (!currentVideo) return;
  if (!reminderDate.value) {
    if (typeof reminderDate.showPicker === 'function') reminderDate.showPicker();
    else reminderDate.click();
    return;
  }
  const reminder = { id: `reminder-${Date.now()}`, videoId: currentVideo.id, title: currentVideo.title, date: reminderDate.value };
  reminders = [...reminders.filter((item) => item.videoId !== currentVideo.id), reminder];
  localStorage.setItem('alxplay-reminders', JSON.stringify(reminders));
  reminderDate.value = '';
  closePlayerMoreMenu();
  showToast('Recordatorio guardado');
}

function checkReminders() {
  const now = Date.now();
  const due = reminders.filter((item) => new Date(item.date).getTime() <= now);
  if (!due.length) return;
  due.forEach((item) => showToast(`Recuerda volver a: ${item.title}`));
  reminders = reminders.filter((item) => new Date(item.date).getTime() > now);
  localStorage.setItem('alxplay-reminders', JSON.stringify(reminders));
}

function createBackup() {
  const backup = { version: 1, createdAt: new Date().toISOString(), history, notes, playlists, trash, deletedNotes, progress: videoProgress, favorites: [...favoriteVideoIds], searchHistory, reminders, stats };
  const file = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = `alxplay-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Copia de seguridad creada');
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('alxplay-theme', nextTheme);
  showToast(nextTheme === 'light' ? 'Tema claro activado' : 'Tema oscuro activado');
}

function isFavorite(videoId) {
  return favoriteVideoIds.has(videoId);
}

function toggleFavorite(videoId) {
  if (isFavorite(videoId)) favoriteVideoIds.delete(videoId);
  else favoriteVideoIds.add(videoId);
  persistFavorites();
  renderCards();
  renderStats();
  updatePlayerFavoriteButton();
  showToast(isFavorite(videoId) ? 'Video añadido a favoritos' : 'Video quitado de favoritos');
}

function updateProgressDisplay() {
  const percent = currentVideoDuration > 0 ? Math.min(100, Math.round((currentVideoTime / currentVideoDuration) * 100)) : 0;
  if (playerProgressBar) playerProgressBar.value = percent;
  if (playerProgressLabel) playerProgressLabel.textContent = currentVideoDuration > 0 ? `${percent}% visto` : `Visto ${formatTimestamp(currentVideoTime)}`;
}

function updatePlayerFavoriteButton() {
  if (!playerFavoriteButton || !currentVideo) return;
  const favorite = isFavorite(currentVideo.id);
  playerFavoriteButton.textContent = favorite ? '★ Favorito' : '☆ Favorito';
  playerFavoriteButton.setAttribute('aria-pressed', String(favorite));
}

function closePlayerMoreMenu() {
  playerMoreMenu.classList.remove('open');
  playerMoreMenu.setAttribute('aria-hidden', 'true');
  togglePlayerNotesButton.setAttribute('aria-expanded', 'false');
}

function showVideoNotes() {
  closePlayerMoreMenu();
  if (!playerNotesPanel.classList.contains('has-notes')) {
    showToast('Este video no tiene notas');
    return;
  }
  playerNotesPanel.classList.add('open');
  togglePlayerNotesButton.setAttribute('aria-expanded', 'true');
}

function updatePlaybackButton(isPlaying) {
  videoToggleButton.dataset.playing = String(isPlaying);
  videoToggleButton.textContent = isPlaying ? 'Ⅱ Pausar' : '▶ Reproducir';
}

function togglePlayback() {
  const isPlaying = videoToggleButton.dataset.playing === 'true';
  sendYoutubeCommand(isPlaying ? 'pauseVideo' : 'playVideo');
}

function saveCurrentVideoPosition() {
  if (!currentVideo || !hasReceivedVideoTime || currentVideoTime <= 0) return;
  videoProgress[currentVideo.id] = Math.floor(currentVideoTime);
  localStorage.setItem('alxplay-progress', JSON.stringify(videoProgress));
}

function getVideoPosition(videoId) {
  const position = Number(videoProgress[videoId]);
  return Number.isFinite(position) && position > 0 ? position : 0;
}

function getPlaylistVideos(playlist) {
  return (playlist.videoIds || []).map((id) => playlist.videos?.find((video) => video.id === id) || history.find((video) => video.id === id)).filter(Boolean);
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
  return escapeHtml(content).replace(/(?:^|\n)\s*(?:#\d+\s*)?(\d{2}:\d{2}:\d{2})\s*(?:[—-])?\s*([^\n]*)/g, (_, timestamp, label) => {
    timestampNumber += 1;
    return `<span class="timestamp-item"><span class="timestamp-index">#${timestampNumber}</span><span class="timestamp-value">${timestamp}${label ? ` — ${label}` : ''}</span><button type="button" class="timestamp-jump" data-note-id="${noteId}" data-timestamp="${timestamp}">▶ Ir al momento</button></span>`;
  }).replace(/\n{2,}/g, '\n');
}

function timestampToSeconds(timestamp) {
  const parts = timestamp.split(':').map(Number);
  return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
}

function renderPlaylistVideoPicker(selectedIds = []) {
  const storedVideos = playlists.flatMap((playlist) => playlist.videos || []);
  const pickerVideos = [...new Map([...history, ...storedVideos].map((video) => [video.id, video])).values()];
  playlistVideoPicker.innerHTML = pickerVideos.length ? pickerVideos.slice(0, 20).map((video) => `<label class="playlist-video-option"><input type="checkbox" value="${escapeHtml(video.id)}" ${selectedIds.includes(video.id) ? 'checked' : ''} /><span>${escapeHtml(video.title)}</span></label>`).join('') : '<p class="form-hint">Primero agrega videos al historial.</p>';
}

function openPlaylistEditor(playlist = null) {
  editingPlaylistId = playlist?.id || null;
  playlistDialogTitle.textContent = playlist ? 'Editar lista' : 'Nueva lista';
  playlistTitle.value = playlist?.title || '';
  playlistDescription.value = playlist?.description || '';
  playlistTags.value = playlist?.tags || '';
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
  const query = playlistsViewState.query.toLowerCase();
  const visiblePlaylists = playlists.filter((playlist) => `${playlist.title} ${playlist.description || ''} ${playlist.tags || ''}`.toLowerCase().includes(query));
  visiblePlaylists.sort((first, second) => {
    if (playlistsViewState.sort === 'title') return first.title.localeCompare(second.title, 'es');
    if (playlistsViewState.sort === 'size') return getPlaylistVideos(second).length - getPlaylistVideos(first).length;
    return new Date(second.modifiedAt || second.createdAt) - new Date(first.modifiedAt || first.createdAt);
  });
  playlistsGrid.innerHTML = visiblePlaylists.length ? visiblePlaylists.map((playlist) => {
    const playlistVideos = getPlaylistVideos(playlist);
    return `<article class="playlist-card"><div class="playlist-card-header"><div><h3>${escapeHtml(playlist.title)}</h3><p>${escapeHtml(playlist.description || 'Sin descripción')}</p>${playlist.tags ? `<p class="playlist-tags">${escapeHtml(playlist.tags)}</p>` : ''}</div><span class="playlist-video-count">${playlistVideos.length} videos</span></div><div class="playlist-video-list">${playlistVideos.length ? playlistVideos.map((video, index) => `<div class="playlist-video-row"><button class="playlist-play-video" type="button" data-play-video="${video.id}" aria-label="Reproducir ${escapeHtml(video.title)}">▶</button><span>${escapeHtml(video.title)}</span><button type="button" data-playlist-action="up" data-playlist-id="${playlist.id}" data-video-id="${video.id}" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" data-playlist-action="down" data-playlist-id="${playlist.id}" data-video-id="${video.id}" ${index === playlistVideos.length - 1 ? 'disabled' : ''}>↓</button><button type="button" data-playlist-action="remove-video" data-playlist-id="${playlist.id}" data-video-id="${video.id}">×</button></div>`).join('') : '<p class="form-hint">Agrega videos desde el historial.</p>'}</div><div class="playlist-actions"><button type="button" data-playlist-action="play-all" data-playlist-id="${playlist.id}">▶ Reproducir todo</button><button type="button" data-playlist-action="add-video" data-playlist-id="${playlist.id}">＋ Agregar video</button><button type="button" data-playlist-action="edit" data-playlist-id="${playlist.id}">✏️ Editar</button><button type="button" data-playlist-action="share" data-playlist-id="${playlist.id}">↗ Compartir</button><button type="button" data-playlist-action="delete" data-playlist-id="${playlist.id}">🗑️ Eliminar</button></div></article>`;
  }).join('') : '<div class="notes-empty">Aún no tienes listas. Crea la primera para ordenar tus videos.</div>';

  playlistsGrid.querySelectorAll('.playlist-play-video').forEach((button) => button.addEventListener('click', () => {
    const video = getPlaylistVideos(playlists.find((item) => item.videoIds.includes(button.dataset.playVideo)) || {}).find((item) => item.id === button.dataset.playVideo);
    if (video) openPlayer(video.id, video.title, video.author);
  }));
  playlistsGrid.querySelectorAll('[data-playlist-action]').forEach((button) => button.addEventListener('click', () => handlePlaylistAction(button.dataset.playlistAction, button.dataset.playlistId, button.dataset.videoId)));
}

function playPlaylist(playlist) {
  playlistQueue = getPlaylistVideos(playlist);
  playlistQueueIndex = 0;
  renderQueue();
  const firstVideo = playlistQueue[0];
  if (!firstVideo) { showToast('Esta lista no tiene videos'); return; }
  openPlayer(firstVideo.id, firstVideo.title, firstVideo.author);
  showToast(`Reproduciendo lista: ${playlist.title}`);
}

async function sharePlaylist(playlist) {
  const videoTitles = getPlaylistVideos(playlist).map((video) => `${video.title} https://www.youtube.com/watch?v=${video.id}`).join('\n');
  const text = `${playlist.title}\n${playlist.description || ''}\n\n${videoTitles}`;
  const sharedData = encodeURIComponent(JSON.stringify({ title: playlist.title, description: playlist.description || '', tags: playlist.tags || '', videoIds: playlist.videoIds, videos: getPlaylistVideos(playlist) }));
  const shareUrl = `${window.location.href.split('#')[0]}#lista=${sharedData}`;
  try { if (navigator.share) await navigator.share({ title: playlist.title, text, url: shareUrl }); else { await navigator.clipboard.writeText(`${text}\n\n${shareUrl}`); showToast('Enlace de lista copiado'); } } catch (error) { if (error.name !== 'AbortError') showToast('No se pudo compartir la lista'); }
}

function importPlaylistFromUrl() {
  const encoded = new URLSearchParams(window.location.hash.slice(1)).get('lista');
  if (!encoded) return;
  try {
    const shared = JSON.parse(decodeURIComponent(encoded));
    if (!shared.title || !Array.isArray(shared.videoIds)) return;
    playlists.push({ ...shared, id: `playlist-${Date.now()}`, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() });
    persistPlaylists();
    renderPlaylists();
    window.location.hash = '#playlists';
    showToast('Lista compartida agregada');
  } catch (error) { showToast('El enlace de lista no es válido'); }
}

function handlePlaylistAction(action, playlistId, videoId) {
  const playlist = playlists.find((item) => item.id === playlistId);
  if (!playlist) return;
  if (action === 'play-all') return playPlaylist(playlist);
  if (action === 'edit') return openPlaylistEditor(playlist);
  if (action === 'add-video') return openPlaylistEditor(playlist);
  if (action === 'share') return sharePlaylist(playlist);
  if (action === 'delete') {
    return openConfirmation('¿Eliminar esta lista de reproducción?', 'Eliminar lista', () => handlePlaylistAction('confirm-delete', playlistId));
  } else if (action === 'confirm-delete') {
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
  const query = historyViewState.query.toLowerCase();
  const visibleHistory = history.filter((video) => {
    const matchesQuery = !query || `${video.title} ${video.author || ''}`.toLowerCase().includes(query);
    return matchesQuery && (!historyViewState.favoritesOnly || isFavorite(video.id));
  });
  const cardsToRender = historyViewState.query || historyViewState.favoritesOnly ? visibleHistory : visibleHistory.slice(0, 6);
  videoGrid.innerHTML = cardsToRender.length ? cardsToRender.map((video) => `
    <article class="video-card" data-video-id="${video.id}" data-title="${video.title}" data-author="${video.author || 'YouTube'}">
      <button class="favorite-video ${isFavorite(video.id) ? 'active' : ''}" type="button" data-favorite-id="${video.id}" aria-label="${isFavorite(video.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}">${isFavorite(video.id) ? '★' : '☆'}</button><button class="remove-video" type="button" data-video-id="${video.id}" aria-label="Eliminar ${video.title}">×</button>
      <div class="thumb" style="background-image: url('https://i.ytimg.com/vi/${video.id}/hqdefault.jpg'), ${video.color || 'linear-gradient(135deg, #1b4b78, #d34b76)'}">
        <span class="play-small"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 8 6-8 6V6Z"></path></svg></span><span class="card-time">${getVideoPosition(video.id) ? `Continuar ${formatTimestamp(getVideoPosition(video.id))}` : (video.time || 'YouTube')}</span>
      </div><div class="card-content"><h3>${video.title}</h3><p>${video.author || 'YouTube'}</p></div></article>`).join('') : '<div class="empty-state">Todavía no tienes videos guardados. Pega un enlace para comenzar.</div>';

  document.querySelectorAll('.video-card').forEach((card) => card.addEventListener('click', (event) => {
    if (event.target.closest('.remove-video')) return;
    openPlayer(card.dataset.videoId, card.dataset.title, card.dataset.author);
  }));

  document.querySelectorAll('.remove-video').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      openConfirmation('¿Quitar este video del historial y eliminar sus notas?', 'Quitar video', () => removeVideo(button.dataset.videoId));
    });
  });
  document.querySelectorAll('.favorite-video').forEach((button) => button.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFavorite(button.dataset.favoriteId);
  }));

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
  renderNoteMarkerPicker(videoId);
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

function openConfirmation(message, actionLabel, action) {
  pendingConfirmation = action;
  confirmActionTitle.textContent = actionLabel;
  confirmActionMessage.textContent = message;
  confirmActionButton.textContent = actionLabel;
  confirmActionModal.classList.add('open');
  confirmActionModal.setAttribute('aria-hidden', 'false');
}

function closeConfirmation() {
  pendingConfirmation = null;
  confirmActionModal.classList.remove('open');
  confirmActionModal.setAttribute('aria-hidden', 'true');
}

function deletePendingNote() {
  if (!pendingDeleteNoteId) return;
  const deleted = notes.find((note) => note.id === pendingDeleteNoteId);
  if (deleted) deletedNotes = [{ ...deleted, deletedAt: new Date().toISOString() }, ...deletedNotes];
  notes = notes.filter((note) => note.id !== pendingDeleteNoteId);
  persistNotes();
  localStorage.setItem('alxplay-deleted-notes', JSON.stringify(deletedNotes));
  renderNotes();
  renderTrash();
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
  document.querySelector('.app-shell').classList.toggle('stats-view', hash === '#estadisticas');
  document.querySelector('.app-shell').classList.toggle('trash-view', hash === '#papelera');
}

function removeVideo(videoId) {
  const removedVideo = history.find((video) => video.id === videoId);
  const removedNotes = notes.filter((note) => note.videoId === videoId);
  if (removedVideo) {
    trash = [{ ...removedVideo, notes: removedNotes, deletedAt: new Date().toISOString() }, ...trash.filter((item) => item.id !== videoId)];
    localStorage.setItem('alxplay-trash', JSON.stringify(trash));
  }
  history = history.filter((video) => video.id !== videoId);
  notes = notes.filter((note) => note.videoId !== videoId);
  persistHistory();
  persistNotes();
  renderCards();
  renderNotes();
  renderStats();
  renderTrash();
  showToast('Video y sus notas eliminados del historial');
}

function renderTrash() {
  const videoRows = trash.map((video) => `<article class="trash-row"><div><strong>${escapeHtml(video.title)}</strong><span>Video eliminado ${formatDate(video.deletedAt)}</span></div><button type="button" data-restore-video="${escapeHtml(video.id)}">Restaurar</button></article>`).join('');
  const noteRows = deletedNotes.map((note) => `<article class="trash-row"><div><strong>${escapeHtml(note.title)}</strong><span>Nota eliminada ${formatDate(note.deletedAt)}</span></div><button type="button" data-restore-note="${escapeHtml(note.id)}">Restaurar</button></article>`).join('');
  trashGrid.innerHTML = videoRows + noteRows || '<div class="empty-state">La papelera está vacía.</div>';
  trashGrid.querySelectorAll('[data-restore-video]').forEach((button) => button.addEventListener('click', () => restoreVideo(button.dataset.restoreVideo)));
  trashGrid.querySelectorAll('[data-restore-note]').forEach((button) => button.addEventListener('click', () => restoreNote(button.dataset.restoreNote)));
}

function restoreNote(noteId) {
  const removed = deletedNotes.find((note) => note.id === noteId);
  if (!removed) return;
  const { deletedAt, ...note } = removed;
  notes.push(note);
  deletedNotes = deletedNotes.filter((item) => item.id !== noteId);
  persistNotes();
  localStorage.setItem('alxplay-deleted-notes', JSON.stringify(deletedNotes));
  renderNotes(); renderTrash();
  showToast('Nota restaurada');
}

function restoreVideo(videoId) {
  const removed = trash.find((video) => video.id === videoId);
  if (!removed) return;
  const { notes: removedNotes = [], deletedAt, ...video } = removed;
  history = [video, ...history.filter((item) => item.id !== videoId)];
  notes = [...notes, ...removedNotes];
  trash = trash.filter((item) => item.id !== videoId);
  persistHistory();
  persistNotes();
  localStorage.setItem('alxplay-trash', JSON.stringify(trash));
  renderCards(); renderNotes(); renderTrash(); renderStats();
  showToast('Video restaurado');
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

function renderYoutubeResults(items) {
  youtubeResultsToolbar.classList.toggle('open', items.length > 0);
  youtubeResults.innerHTML = items.length ? items.map((item) => `<article class="youtube-result"><img src="${escapeHtml(item.thumbnail)}" alt="" /><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.channel)}</p><button type="button" data-youtube-result="${escapeHtml(item.id)}" data-result-title="${escapeHtml(item.title)}" data-result-channel="${escapeHtml(item.channel)}">▶ Reproducir</button><button type="button" data-youtube-history="${escapeHtml(item.id)}" data-result-title="${escapeHtml(item.title)}" data-result-channel="${escapeHtml(item.channel)}">＋ Añadir</button><button type="button" data-youtube-queue="${escapeHtml(item.id)}" data-result-title="${escapeHtml(item.title)}" data-result-channel="${escapeHtml(item.channel)}">＋ Cola</button></div></article>`).join('') : '<p class="form-hint">No encontramos videos.</p>';
  youtubeResults.querySelectorAll('[data-youtube-result]').forEach((button) => button.addEventListener('click', () => {
    const video = { id: button.dataset.youtubeResult, title: button.dataset.resultTitle, author: button.dataset.resultChannel, channel: button.dataset.resultChannel, time: 'YouTube' };
    saveVideoToHistory(video);
    openPlayer(video.id, video.title, video.channel);
  }));
  youtubeResults.querySelectorAll('[data-youtube-queue]').forEach((button) => button.addEventListener('click', () => {
    const video = { id: button.dataset.youtubeQueue, title: button.dataset.resultTitle, channel: button.dataset.resultChannel };
    if (!playlistQueue.some((item) => item.id === video.id)) playlistQueue.push(video);
    showToast('Video añadido a la cola');
  }));
  youtubeResults.querySelectorAll('[data-youtube-history]').forEach((button) => button.addEventListener('click', () => {
    saveVideoToHistory({ id: button.dataset.youtubeHistory, title: button.dataset.resultTitle, author: button.dataset.resultChannel, channel: button.dataset.resultChannel, time: 'YouTube' });
    showToast('Video añadido al historial');
  }));
}

function saveVideoToHistory(video) {
  const savedVideo = { ...video, author: video.author || video.channel || 'YouTube', time: video.time || 'YouTube', color: video.color || 'linear-gradient(135deg, #1c4178, #6339a7)' };
  history = [savedVideo, ...history.filter((item) => item.id !== savedVideo.id)];
  persistHistory();
  renderCards();
  renderStats();
}

function clearYoutubeResults() {
  videoInput.value = '';
  youtubeResults.innerHTML = '';
  youtubeResultsToolbar.classList.remove('open');
  formMessage.textContent = 'Busca un video o pega su enlace de YouTube.';
  videoInput.focus();
}

async function openAddVideoDialog() {
  const videoId = parseVideoId(videoInput.value.trim());
  if (!videoId) {
    formMessage.textContent = 'Para añadir un video pega una URL o ID de YouTube.';
    return;
  }
  const existing = history.find((video) => video.id === videoId);
  pendingHistoryVideo = { id: videoId, title: existing?.title || 'Video de YouTube', author: existing?.author || 'Canal de YouTube', channel: existing?.author || 'Canal de YouTube', time: 'YouTube' };
  addVideoTitle.textContent = pendingHistoryVideo.title;
  addVideoChannel.textContent = pendingHistoryVideo.channel;
  addVideoThumbnail.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  addVideoModal.classList.add('open');
  addVideoModal.setAttribute('aria-hidden', 'false');
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, { cache: 'no-store' });
    if (response.ok && pendingHistoryVideo?.id === videoId) {
      const details = await response.json();
      pendingHistoryVideo.title = details.title || pendingHistoryVideo.title;
      pendingHistoryVideo.author = details.author_name || pendingHistoryVideo.author;
      pendingHistoryVideo.channel = pendingHistoryVideo.author;
      addVideoTitle.textContent = pendingHistoryVideo.title;
      addVideoChannel.textContent = pendingHistoryVideo.channel;
    }
  } catch (error) {}
}

function closeAddVideoDialog() {
  pendingHistoryVideo = null;
  addVideoModal.classList.remove('open');
  addVideoModal.setAttribute('aria-hidden', 'true');
}

async function searchYoutube(query) {
  formMessage.textContent = 'Buscando en YouTube...';
  youtubeResults.innerHTML = '';
  try {
    const endpoint = YOUTUBE_API_KEY
      ? `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${encodeURIComponent(YOUTUBE_API_KEY)}`
      : `/api/youtube-search?q=${encodeURIComponent(query)}`;
    const response = await fetch(endpoint);
    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      throw new Error('El servidor no devolvió una respuesta JSON. En GitHub Pages revisa que app.js tenga la clave configurada y publicada.');
    }
    if (!response.ok) throw new Error(data.error || 'No se pudo buscar');
    const items = YOUTUBE_API_KEY ? (data.items || []).map((item) => ({ id: item.id.videoId, title: item.snippet.title, channel: item.snippet.channelTitle, thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '' })) : (data.items || []);
    renderYoutubeResults(items);
    formMessage.textContent = `${items.length} resultados encontrados.`;
  } catch (error) {
    formMessage.textContent = error.message;
    youtubeResults.innerHTML = '';
  }
}

function openPlayer(id, title = 'Video de YouTube', channel = 'Canal de YouTube') {
  if (!id || !/^[\w-]{11}$/.test(id)) return;
  clearVideoTimer();
  currentVideo = { id, title: title || 'Video de YouTube', channel: channel || 'Canal de YouTube' };
  currentVideoTime = getVideoPosition(id);
  currentVideoDuration = 0;
  lastProgressTick = 0;
  hasReceivedVideoTime = false;
  updatePlaybackButton(false);
  youtubeFrame.src = `https://www.youtube.com/embed/${id}?controls=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&rel=0&modestbranding=1&playsinline=1`;
  watchOnYoutube.href = `https://www.youtube.com/watch?v=${id}`;
  playerTitle.textContent = title || 'Video de YouTube';
  if (playerChannel) playerChannel.textContent = channel || 'Canal de YouTube';
  renderPlayerNotes(id);
  updatePlayerFavoriteButton();
  updateProgressDisplay();
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
  saveCurrentVideoPosition();
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

function addCurrentMarker() {
  if (!currentVideo) return;
  markerRequestPending = true;
  sendYoutubeCommand('getCurrentTime');
  window.setTimeout(() => {
    if (markerRequestPending) {
      markerRequestPending = false;
      if (hasReceivedVideoTime) openMarkerEditor(currentVideoTime);
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
  if (!id) {
    const query = videoInput.value.trim();
    if (query) { recordSearch(query); await searchYoutube(query); }
    return;
  }
  if (!id) { formMessage.textContent = 'No encontramos un ID válido. Prueba con un enlace de YouTube.'; formMessage.style.color = '#ff8f9b'; return; }
  recordSearch(videoInput.value);
  if (history.some((video) => video.id === id)) showToast('Este video ya estaba guardado; se actualizará su posición.');
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

searchYoutubeButton.addEventListener('click', async () => {
  const query = videoInput.value.trim();
  if (!query) { videoInput.focus(); return; }
  if (parseVideoId(query)) { formMessage.textContent = 'Para reproducir una URL o ID usa el botón Reproducir.'; return; }
  recordSearch(query);
  await searchYoutube(query);
});
clearSearchInput.addEventListener('click', clearYoutubeResults);
addVideoButton.addEventListener('click', openAddVideoDialog);
closeAddVideo.addEventListener('click', closeAddVideoDialog);
cancelAddVideo.addEventListener('click', closeAddVideoDialog);
confirmAddVideo.addEventListener('click', () => {
  if (!pendingHistoryVideo) return;
  saveVideoToHistory(pendingHistoryVideo);
  closeAddVideoDialog();
  videoInput.value = '';
  showToast('Video añadido al historial');
});

document.querySelector('#closePlayer').addEventListener('click', closePlayer);
if (clearAllHistory) {
  clearAllHistory.addEventListener('click', () => {
    openConfirmation('¿Limpiar todo el historial y sus notas?', 'Limpiar historial', () => {
    trash = [...history.map((video) => ({ ...video, notes: notes.filter((note) => note.videoId === video.id), deletedAt: new Date().toISOString() })), ...trash];
    history = [];
    notes = [];
    favoriteVideoIds.clear();
    localStorage.removeItem('alxplay-history');
    persistNotes();
    persistFavorites();
    localStorage.setItem('alxplay-trash', JSON.stringify(trash));
    renderCards();
    renderNotes();
    renderStats();
    renderTrash();
    showToast('Historial y notas limpiados');
    });
  });
}
historySearch.addEventListener('input', (event) => { historyViewState.query = event.target.value; renderCards(); });
favoritesOnly.addEventListener('change', (event) => { historyViewState.favoritesOnly = event.target.checked; renderCards(); });
playerFavoriteButton.addEventListener('click', () => { if (currentVideo) toggleFavorite(currentVideo.id); });
addQueueButton.addEventListener('click', () => toggleActionMenu(queueActionMenu, addQueueButton));
document.querySelector('#addToQueueMenuButton').addEventListener('click', () => {
  if (!currentVideo) return;
  if (!playlistQueue.some((video) => video.id === currentVideo.id)) playlistQueue.push({ ...currentVideo, author: currentVideo.channel });
  renderQueue();
  closeActionMenus();
  showToast('Video añadido a la cola');
});
document.querySelector('#viewQueueMenuButton').addEventListener('click', () => {
  closeActionMenus();
  queuePanel.classList.add('open');
});
quickMarkerButton.addEventListener('click', () => toggleActionMenu(markerActionMenu, quickMarkerButton));
document.querySelector('#addMarkerMenuButton').addEventListener('click', addCurrentMarker);
document.querySelector('#viewMarkersMenuButton').addEventListener('click', openMarkersView);
playbackRate.addEventListener('change', (event) => { localStorage.setItem('alxplay-rate', event.target.value); sendYoutubeCommand('setPlaybackRate', [Number(event.target.value)]); });
autoplayNext.addEventListener('change', (event) => localStorage.setItem('alxplay-autoplay', String(event.target.checked)));
reminderButton.addEventListener('click', saveReminder);
reminderDate.addEventListener('change', saveReminder);
backupAllButton.addEventListener('click', createBackup);
function downloadJson(filename, data) {
  const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
exportFavoritesButton.addEventListener('click', () => { downloadJson('alxplay-favoritos.json', history.filter((video) => favoriteVideoIds.has(video.id))); showToast('Favoritos exportados'); });
exportProgressButton.addEventListener('click', () => { downloadJson('alxplay-progreso.json', history.map((video) => ({ ...video, position: getVideoPosition(video.id) })).filter((video) => video.position > 0)); showToast('Progreso exportado'); });
statsPeriod.addEventListener('change', (event) => { statsPeriodValue = event.target.value; renderStats(); });
clearQueueButton.addEventListener('click', () => { playlistQueue = []; playlistQueueIndex = 0; renderQueue(); });
closeQueueButton.addEventListener('click', closeQueue);
document.querySelector('#closeMarker').addEventListener('click', closeMarkerEditor);
document.querySelector('#cancelMarker').addEventListener('click', closeMarkerEditor);
document.querySelector('#closeMarkersView').addEventListener('click', closeMarkersView);
markerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!currentVideo || !markerTitle.value.trim()) return;
  const marker = { id: `marker-${Date.now()}-${Math.random().toString(36).slice(2)}`, title: markerTitle.value.trim(), time: formatTimestamp(pendingMarkerSeconds), seconds: pendingMarkerSeconds };
  markers[currentVideo.id] = [...getVideoMarkers(currentVideo.id), marker];
  persistMarkers();
  closeMarkerEditor();
  showToast('Marca guardada');
});
emptyTrashButton.addEventListener('click', () => openConfirmation('¿Vaciar definitivamente la papelera?', 'Vaciar papelera', () => { trash = []; deletedNotes = []; localStorage.removeItem('alxplay-trash'); localStorage.removeItem('alxplay-deleted-notes'); renderTrash(); showToast('Papelera vaciada'); }));
restoreAllButton.addEventListener('click', () => restoreAllInput.click());
clearSearchHistoryButton.addEventListener('click', () => { searchHistory = []; localStorage.removeItem('alxplay-search-history'); renderStats(); });
settingsButton.addEventListener('click', () => {
  const isOpen = settingsPopover.classList.toggle('open');
  settingsPopover.setAttribute('aria-hidden', String(!isOpen));
  settingsButton.setAttribute('aria-expanded', String(isOpen));
});
cardOutlineColor.addEventListener('input', (event) => {
  document.documentElement.style.setProperty('--card-outline', event.target.value);
  localStorage.setItem('alxplay-card-outline', event.target.value);
  cardOutlineColorDesktop.value = event.target.value;
});
cardOutlineColorDesktop.addEventListener('input', (event) => {
  cardOutlineColor.value = event.target.value;
  cardOutlineColor.dispatchEvent(new Event('input'));
});
resetCardOutline.addEventListener('click', () => {
  cardOutlineColor.value = '#ff2b2b';
  cardOutlineColor.dispatchEvent(new Event('input'));
  showToast('Color del contorno restaurado');
});
resetCardOutlineDesktop.addEventListener('click', () => resetCardOutline.click());
restoreAllInput.addEventListener('change', () => {
  const file = restoreAllInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const backup = JSON.parse(reader.result);
      if (!backup || !Array.isArray(backup.history) || !Array.isArray(backup.notes) || !Array.isArray(backup.playlists)) throw new Error('Formato inválido');
      history = backup.history; notes = backup.notes; playlists = backup.playlists; trash = backup.trash || []; deletedNotes = backup.deletedNotes || []; Object.assign(videoProgress, backup.progress || {}); favoriteVideoIds = new Set(backup.favorites || []); searchHistory = backup.searchHistory || []; reminders = backup.reminders || []; stats = backup.stats || stats;
      persistHistory(); persistNotes(); persistPlaylists(); persistFavorites(); persistStats(); localStorage.setItem('alxplay-trash', JSON.stringify(trash)); localStorage.setItem('alxplay-deleted-notes', JSON.stringify(deletedNotes)); localStorage.setItem('alxplay-search-history', JSON.stringify(searchHistory)); localStorage.setItem('alxplay-reminders', JSON.stringify(reminders));
      renderCards(); renderNotes(); renderPlaylists(); renderStats(); renderTrash(); showToast('Copia restaurada');
    } catch (error) { showToast('La copia no es válida'); }
    restoreAllInput.value = '';
  };
  reader.readAsText(file);
});
videoToggleButton.addEventListener('click', togglePlayback);
document.querySelector('#videoMuteButton').addEventListener('click', (event) => { const muted = event.currentTarget.dataset.muted === 'true'; sendYoutubeCommand(muted ? 'unMute' : 'mute'); event.currentTarget.dataset.muted = String(!muted); event.currentTarget.textContent = muted ? '🔊 Silenciar' : '🔇 Activar sonido'; });
document.querySelector('#videoBackButton')?.addEventListener('click', () => sendYoutubeCommand('seekTo', [0, true]));
document.querySelector('#videoForwardButton')?.addEventListener('click', () => sendYoutubeCommand('seekTo', [10, true]));
document.querySelector('#videoFullscreenButton').addEventListener('click', () => { if (youtubeFrame.requestFullscreen) youtubeFrame.requestFullscreen(); });
document.querySelector('#videoVolume').addEventListener('input', (event) => sendYoutubeCommand('setVolume', [Number(event.target.value)]));
videoTimerButton.addEventListener('click', toggleVideoTimer);
videoTimerMinutes.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); toggleVideoTimer(); } });
function closePlayerNoteMenu() {
  playerNoteMenu.classList.remove('open');
  playerNoteMenu.setAttribute('aria-hidden', 'true');
}

document.querySelector('#openPlayerNoteButton').addEventListener('click', () => {
  const isOpen = playerNoteMenu.classList.toggle('open');
  playerNoteMenu.setAttribute('aria-hidden', String(!isOpen));
});
createVideoNoteButton.addEventListener('click', () => {
  closePlayerNoteMenu();
  if (currentVideo) openNoteEditor(currentVideo.id, currentVideo.title, currentVideo.channel);
});
togglePlayerNotesButton.addEventListener('click', () => {
  const isOpen = playerMoreMenu.classList.toggle('open');
  playerMoreMenu.setAttribute('aria-hidden', String(!isOpen));
  togglePlayerNotesButton.setAttribute('aria-expanded', String(isOpen));
});
document.querySelector('#viewVideoNotesButton').addEventListener('click', () => {
  closePlayerNoteMenu();
  showVideoNotes();
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
    if (playlist) Object.assign(playlist, { title: playlistTitle.value.trim(), description: playlistDescription.value.trim(), tags: playlistTags.value.trim(), videoIds, videos: videoIds.map((id) => history.find((video) => video.id === id)).filter(Boolean), modifiedAt: now });
  } else {
    playlists.push({ id: `playlist-${Date.now()}-${Math.random().toString(36).slice(2)}`, title: playlistTitle.value.trim(), description: playlistDescription.value.trim(), tags: playlistTags.value.trim(), videoIds, videos: videoIds.map((id) => history.find((video) => video.id === id)).filter(Boolean), createdAt: now, modifiedAt: now });
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
playlistSearch.addEventListener('input', (event) => { playlistsViewState.query = event.target.value; renderPlaylists(); });
playlistSort.addEventListener('change', (event) => { playlistsViewState.sort = event.target.value; renderPlaylists(); });
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
exportPlaylistsButton.addEventListener('click', () => {
  const file = new Blob([JSON.stringify(playlists, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = `alxplay-listas-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Listas exportadas');
});
importPlaylistsButton.addEventListener('click', () => importPlaylistsInput.click());
importPlaylistsInput.addEventListener('change', () => {
  const file = importPlaylistsInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error('Formato inválido');
      const existingIds = new Set(playlists.map((playlist) => playlist.id));
      const validPlaylists = imported.filter((playlist) => playlist?.title && Array.isArray(playlist.videoIds)).map((playlist) => ({ ...playlist, id: existingIds.has(playlist.id) ? `playlist-${Date.now()}-${Math.random().toString(36).slice(2)}` : playlist.id, videos: Array.isArray(playlist.videos) ? playlist.videos : playlist.videoIds.map((id) => history.find((video) => video.id === id)).filter(Boolean), createdAt: playlist.createdAt || new Date().toISOString(), modifiedAt: playlist.modifiedAt || new Date().toISOString() }));
      playlists = [...playlists, ...validPlaylists];
      persistPlaylists();
      renderPlaylists();
      showToast(`${validPlaylists.length} listas importadas`);
    } catch (error) { showToast('El archivo de listas no es válido'); }
    importPlaylistsInput.value = '';
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
closeConfirmAction.addEventListener('click', closeConfirmation);
cancelConfirmAction.addEventListener('click', closeConfirmation);
confirmActionButton.addEventListener('click', () => {
  const action = pendingConfirmation;
  closeConfirmation();
  if (action) action();
});
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
    const duration = Number(data?.info?.duration);
    if (Number.isFinite(duration) && duration > 0) currentVideoDuration = duration;
    if (Number.isFinite(time)) {
      if (lastProgressTick > 0 && time >= lastProgressTick && time - lastProgressTick < 5) {
        addStatsActivity(time - lastProgressTick, 0);
        renderStats();
      }
      lastProgressTick = time;
      currentVideoTime = time;
      hasReceivedVideoTime = true;
      saveCurrentVideoPosition();
      updateProgressDisplay();
      if (timestampRequestPending) {
        timestampRequestPending = false;
        saveCurrentTimestamp();
      }
      if (markerRequestPending) {
        markerRequestPending = false;
        openMarkerEditor(time);
      }
    }
    if (data?.event === 'onReady') {
      sendYoutubeCommand('addEventListener', ['onStateChange']);
      sendYoutubeCommand('getCurrentTime');
      if (currentVideoTime > 0) sendYoutubeCommand('seekTo', [currentVideoTime, true]);
      sendYoutubeCommand('setPlaybackRate', [Number(playbackRate.value || 1)]);
    }
    if (Number(data?.info?.playerState) === 0) {
      updatePlaybackButton(false);
      addStatsActivity(0, 1);
      renderStats();
    }
    if (Number(data?.info?.playerState) === 1) updatePlaybackButton(true);
    if (Number(data?.info?.playerState) === 2) updatePlaybackButton(false);
    if (Number(data?.info?.playerState) === 0 && autoplayNext.checked && playlistQueue.length && playlistQueueIndex < playlistQueue.length - 1) {
      playlistQueueIndex += 1;
      const nextVideo = playlistQueue[playlistQueueIndex];
      openPlayer(nextVideo.id, nextVideo.title, nextVideo.author);
    }
  } catch (error) { /* YouTube can send non-JSON messages. */ }
});
youtubeFrame.addEventListener('load', initializeYoutubeMessaging);
window.addEventListener('beforeunload', saveCurrentVideoPosition);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (confirmActionModal.classList.contains('open')) closeConfirmation(); else if (markersViewModal.classList.contains('open')) closeMarkersView(); else if (markerModal.classList.contains('open')) closeMarkerEditor(); else if (addVideoModal.classList.contains('open')) closeAddVideoDialog(); else if (queuePanel.classList.contains('open')) closeQueue(); else if (settingsPopover.classList.contains('open')) { settingsPopover.classList.remove('open'); settingsPopover.setAttribute('aria-hidden', 'true'); settingsButton.setAttribute('aria-expanded', 'false'); } else if (queueActionMenu.classList.contains('open') || markerActionMenu.classList.contains('open')) closeActionMenus(); else if (playerNoteMenu.classList.contains('open')) closePlayerNoteMenu(); else if (playerMoreMenu.classList.contains('open')) closePlayerMoreMenu(); else if (noteModal.classList.contains('open')) closeNoteEditor(); else if (sharedNoteModal.classList.contains('open')) closeSharedNoteEditor(); else if (deleteNoteModal.classList.contains('open')) closeDeleteNoteModal(); else if (playlistModal.classList.contains('open')) closePlaylistEditor(); else if (sideMenu.classList.contains('open')) setMenuOpen(false); else closePlayer();
    return;
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); videoInput.focus(); return; }
  if (!playerModal.classList.contains('open') || ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
  if (event.key === ' ') { event.preventDefault(); togglePlayback(); }
  if (event.key.toLowerCase() === 'p') sendYoutubeCommand('pauseVideo');
  if (event.key.toLowerCase() === 'm') sendYoutubeCommand('mute');
  if (event.key === 'ArrowRight') sendYoutubeCommand('seekTo', [currentVideoTime + 10, true]);
  if (event.key === 'ArrowLeft') sendYoutubeCommand('seekTo', [Math.max(0, currentVideoTime - 10), true]);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.player-more')) closePlayerMoreMenu();
  if (!event.target.closest('.player-note-menu-wrap')) closePlayerNoteMenu();
  if (!event.target.closest('.player-action-menu-wrap')) closeActionMenus();
  if (queuePanel.classList.contains('open') && !event.target.closest('#queuePanel') && !event.target.closest('#viewQueueMenuButton')) closeQueue();
  if (!event.target.closest('.settings-wrap') && settingsPopover.classList.contains('open')) { settingsPopover.classList.remove('open'); settingsPopover.setAttribute('aria-hidden', 'true'); settingsButton.setAttribute('aria-expanded', 'false'); }
});
renderCards();
renderNotes();
renderPlaylists();
renderStats();
renderQueue();
renderTrash();
importPlaylistFromUrl();
playbackRate.value = localStorage.getItem('alxplay-rate') || '1';
checkReminders();
window.setInterval(checkReminders, 60000);
syncView();

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js?v=cache-v28', { updateViaCache: 'none' }).catch(() => {}));
