import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const initialFormData = {
  date: '',
  category: '',
  status: '',
  resolution_time: '',
  channel: '',
  owner: '',
  notes: ''
};

function App() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('todos');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const fetchTickets = async () => {
    try {
      setIsLoadingTickets(true);
      setErrorMessage('');

      const response = await fetch(`${API_URL}/tickets`);

      if (!response.ok) {
        throw new Error('Não foi possível buscar os tickets.');
      }

      const data = await response.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao buscar tickets.');
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const showTemporarySuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const isValidDate = (dateString) => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(`${dateString}T00:00:00`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const parseResolutionTime = (value) => {
    if (!value || typeof value !== 'string') return null;

    const normalized = value.trim().toLowerCase();

    if (!normalized) return null;

    if (/^\d+:\d{2}$/.test(normalized)) {
      const [hours, minutes] = normalized.split(':').map(Number);

      if (minutes >= 60) return null;

      return hours + minutes / 60;
    }

    if (/^\d+h$/.test(normalized)) {
      const hours = Number(normalized.replace('h', ''));
      return hours > 0 ? hours : null;
    }

    if (/^\d+min$/.test(normalized)) {
      const minutes = Number(normalized.replace('min', ''));
      return minutes > 0 ? minutes / 60 : null;
    }

    return null;
  };

  const validateForm = () => {
    const owner = formData.owner.trim();
    const notes = formData.notes.trim();
    const parsedResolutionTime = parseResolutionTime(formData.resolution_time);

    if (
      !formData.date ||
      !formData.category ||
      !formData.status ||
      !formData.channel ||
      !owner ||
      !notes ||
      !formData.resolution_time.trim()
    ) {
      return 'Todos os campos são obrigatórios.';
    }

    if (!isValidDate(formData.date)) {
      return 'Informe uma data válida.';
    }

    if (parsedResolutionTime === null || parsedResolutionTime <= 0) {
      return 'Informe o tempo no formato 30min, 1h ou 1:30.';
    }

    if (owner.length > 60) {
      return 'O responsável pode ter no máximo 60 caracteres.';
    }

    if (notes.length > 200) {
      return 'As observações podem ter no máximo 200 caracteres.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage('');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');

      const payload = {
        ...formData,
        owner: formData.owner.trim(),
        notes: formData.notes.trim(),
        resolution_time: parseResolutionTime(formData.resolution_time)
      };

      const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar ticket.');
      }

      setFormData(initialFormData);
      showTemporarySuccess('Ticket adicionado com sucesso.');
      fetchTickets();
    } catch (error) {
      setErrorMessage(error.message || 'Erro ao criar ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleDateString('pt-BR');
  };

  const formatResolutionTime = (time) => {
  const numericTime = Number(time);

  if (Number.isNaN(numericTime) || numericTime <= 0) return '';

  const totalMinutes = Math.round(numericTime * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h${minutes}min`;
};

  const totalTickets = tickets.length;

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'pendente'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'em andamento'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'resolvido'
  ).length;

  const filteredTickets = useMemo(() => {
    const list =
      filter === 'todos'
        ? tickets
        : tickets.filter(
            (ticket) => ticket.status?.toLowerCase() === filter
          );

    return [...list].sort((a, b) => {
      const dateDiff =
        new Date(`${a.date}T00:00:00`) - new Date(`${b.date}T00:00:00`);

      if (dateDiff !== 0) return dateDiff;

      return a.id - b.id;
    });
  }, [tickets, filter]);

  const getStatusClass = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === 'pendente') return 'status-badge pending';
    if (normalizedStatus === 'em andamento') return 'status-badge in-progress';
    return 'status-badge resolved';
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Dashboard de Atendimento</h1>
        <p>Painel para Acompanhamento de Tickets Operacionais</p>
      </header>

      <section className="kpi-grid four-columns">
        <div className="kpi-card">
          <h3>Total de Tickets</h3>
          <span>{totalTickets}</span>
          <p>Total Registrado na Operação</p>
        </div>

        <div className="kpi-card">
          <h3>Pendentes</h3>
          <span>{pendingTickets}</span>
          <p>Aguardando Tratamento</p>
        </div>

        <div className="kpi-card">
          <h3>Em Andamento</h3>
          <span>{inProgressTickets}</span>
          <p>Em Análise ou Execução</p>
        </div>

        <div className="kpi-card">
          <h3>Resolvidos</h3>
          <span>{resolvedTickets}</span>
          <p>Finalizados com Sucesso</p>
        </div>
      </section>

      <section className="form-section">
        <h2>Novo Ticket</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="ticket-form">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Selecione a categoria</option>
            <option value="Logística">Logística</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Atendimento">Atendimento</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Resolvido">Resolvido</option>
          </select>

          <input
            type="text"
            name="resolution_time"
            value={formData.resolution_time}
            onChange={handleChange}
            placeholder="Tempo (ex: 30min, 1h, 1:30)"
          />

          <select
            name="channel"
            value={formData.channel}
            onChange={handleChange}
          >
            <option value="">Selecione o canal</option>
            <option value="Chat">Chat</option>
            <option value="E-mail">E-mail</option>
            <option value="Telefone">Telefone</option>
          </select>

          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            placeholder="Responsável"
            maxLength="60"
          />

          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Observações"
            className="notes-input"
            maxLength="200"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Adicionar Ticket'}
          </button>
        </form>
      </section>

      <section className="table-section">
        <div className="table-header">
          <h2>Tickets Cadastrados</h2>

          <div className="filter-buttons">
            <button
              type="button"
              className={filter === 'todos' ? 'active-filter' : ''}
              onClick={() => setFilter('todos')}
            >
              Todos
            </button>

            <button
              type="button"
              className={filter === 'pendente' ? 'active-filter' : ''}
              onClick={() => setFilter('pendente')}
            >
              Pendentes
            </button>

            <button
              type="button"
              className={filter === 'em andamento' ? 'active-filter' : ''}
              onClick={() => setFilter('em andamento')}
            >
              Em Andamento
            </button>

            <button
              type="button"
              className={filter === 'resolvido' ? 'active-filter' : ''}
              onClick={() => setFilter('resolvido')}
            >
              Resolvidos
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Canal</th>
                <th>Responsável</th>
                <th>Tempo</th>
                <th>Observações</th>
              </tr>
            </thead>

            <tbody>
              {isLoadingTickets ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    Carregando tickets...
                  </td>
                </tr>
              ) : filteredTickets.length > 0 ? (
                filteredTickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(ticket.date)}</td>
                    <td>{ticket.category}</td>
                    <td>
                      <span className={getStatusClass(ticket.status)}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.channel}</td>
                    <td>{ticket.owner}</td>
                    <td>{formatResolutionTime(ticket.resolution_time)}</td>
                    <td>{ticket.notes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    Nenhum ticket encontrado para este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;