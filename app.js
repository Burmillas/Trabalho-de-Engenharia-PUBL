const requirements = [
  { id: 'US01', title: 'Cadastrar tarefas e compromissos', value: 'Organizar responsabilidades', priority: 'Must Have', estimate: 3, dependency: 'Nenhuma' },
  { id: 'US05', title: 'Cadastrar escalas de trabalho', value: 'Manter disponibilidade', priority: 'Must Have', estimate: 3, dependency: 'Nenhuma' },
  { id: 'US07', title: 'Registrar horários das aulas', value: 'Considerar na organização', priority: 'Must Have', estimate: 2, dependency: 'Nenhuma' },
  { id: 'US04', title: 'Gerar rotina adaptativa', value: 'Aproveitar melhor o tempo', priority: 'Must Have', estimate: 5, dependency: 'US01, US05, US07' },
  { id: 'US02', title: 'Visualizar tarefas pendentes', value: 'Evitar esquecimentos', priority: 'Must Have', estimate: 2, dependency: 'US01' },
  { id: 'US06', title: 'Reorganizar após alterações', value: 'Manter rotina flexível', priority: 'Should Have', estimate: 5, dependency: 'US04' },
  { id: 'US03', title: 'Receber notificações', value: 'Não esquecer prazos', priority: 'Should Have', estimate: 3, dependency: 'US01, US04' },
  { id: 'US08', title: 'Registrar deslocamento', value: 'Ajustar disponibilidade', priority: 'Could Have', estimate: 2, dependency: 'US04' },
  { id: 'US10', title: 'Acompanhar progresso', value: 'Compreender evolução', priority: 'Could Have', estimate: 3, dependency: 'US01, US04' },
  { id: 'US11', title: 'Identificar revisões', value: 'Direcionar estudos', priority: 'Could Have', estimate: 5, dependency: 'US10' },
  { id: 'US09', title: 'Integrar calendários', value: 'Centralizar compromissos', priority: "Won't Have", estimate: 8, dependency: 'Provedor externo' }
];

const body = document.querySelector('#requirements-body');
const searchInput = document.querySelector('#search-input');
const priorityFilter = document.querySelector('#priority-filter');
const clearButton = document.querySelector('#clear-button');
const emptyState = document.querySelector('#empty-state');
const resultCount = document.querySelector('#result-count');
let sortAscending = true;

function priorityClass(priority) {
  return priority.toLowerCase().replaceAll(' ', '-').replace("'", '');
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedPriority = priorityFilter.value;
  const filtered = requirements
    .filter((item) => selectedPriority === 'all' || item.priority === selectedPriority)
    .filter((item) => [item.id, item.title, item.value, item.priority, item.dependency].join(' ').toLowerCase().includes(query))
    .sort((a, b) => sortAscending ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id));

  body.innerHTML = filtered.map((item) => `
    <tr>
      <td class="id-cell">${item.id}</td>
      <td><span class="title-cell">${item.title}</span></td>
      <td><span class="value-cell">${item.value}</span></td>
      <td><span class="priority ${priorityClass(item.priority)}">${item.priority}</span></td>
      <td><span class="estimate">${item.estimate}</span></td>
      <td><span class="dependency">${item.dependency}</span></td>
    </tr>
  `).join('');

  emptyState.hidden = filtered.length !== 0;
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'requisito' : 'requisitos'}`;
}

searchInput.addEventListener('input', render);
priorityFilter.addEventListener('change', render);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  priorityFilter.value = 'all';
  render();
});
document.querySelector('[data-sort="id"]').addEventListener('click', () => {
  sortAscending = !sortAscending;
  render();
});

render();
