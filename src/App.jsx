import { useMemo, useState } from 'react'
import './App.css'

const emptyForm = {
  destination: '',
  startDate: '',
  endDate: '',
  budget: '',
}

const emptyActivity = {
  name: '',
  cost: '',
  notes: '',
}

const toLocalDate = (dateString) => {
  if (!dateString) return null

  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return null

  return new Date(year, month - 1, day)
}

const toDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

const formatDate = (dateString) => {
  const date = toLocalDate(dateString)
  if (!date) return '—'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const formatDayLabel = (dateString) => {
  const date = toLocalDate(dateString)
  if (!date) return '—'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const getTripDays = (startDate, endDate) => {
  const start = toLocalDate(startDate)
  const end = toLocalDate(endDate)
  const days = []

  if (!start || !end || start > end) {
    return days
  }

  for (let current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
    const dateObject = new Date(current)
    const dateKey = toDateKey(dateObject)

    days.push({
      id: dateKey,
      dayNumber: days.length + 1,
      fullDate: dateObject,
      label: formatDayLabel(dateKey),
    })
  }

  return days
}

const validateTripSetup = ({ destination, startDate, endDate, budget }) => {
  if (!destination || !destination.trim()) {
    return 'Please enter a destination.'
  }

  if (!startDate) {
    return 'Please enter a start date.'
  }

  if (!endDate) {
    return 'Please enter an end date.'
  }

  const start = toLocalDate(startDate)
  const end = toLocalDate(endDate)

  if (!start || !end) {
    return 'Please use valid dates.'
  }

  if (start > end) {
    return 'End date cannot be before the start date.'
  }

  const trimmedBudget = String(budget).trim()
  if (trimmedBudget === '') {
    return 'Please enter a trip budget.'
  }

  const numericBudget = Number(trimmedBudget)
  if (!Number.isFinite(numericBudget) || numericBudget < 0) {
    return 'Budget must be a valid number greater than or equal to 0.'
  }

  return ''
}

const validateActivity = ({ name, cost }) => {
  const trimmedName = name.trim()
  if (!trimmedName) {
    return 'Activity name is required.'
  }

  const trimmedCost = String(cost).trim()
  if (trimmedCost === '') {
    return 'Please enter an activity cost.'
  }

  const numericCost = Number(trimmedCost)
  if (!Number.isFinite(numericCost) || numericCost < 0) {
    return 'Activity cost must be a valid number greater than or equal to 0.'
  }

  return ''
}

function TripForm({ formData, onChange, onSubmit, error }) {
  return (
    <form className="trip-form" onSubmit={onSubmit}>
      <div className="form-header">
        <p className="eyebrow">Trip setup</p>
        <h2>Plan your next adventure</h2>
      </div>

      <div className="field-group">
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          name="destination"
          type="text"
          value={formData.destination}
          onChange={onChange}
          placeholder="e.g. Bali, Indonesia"
          required
        />
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="startDate">Start date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={onChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="endDate">End date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="budget">Trip budget</label>
        <input
          id="budget"
          name="budget"
          type="number"
          min="0"
          step="50"
          value={formData.budget}
          onChange={onChange}
          placeholder="e.g. 1800"
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="primary-button">
        Start Planning
      </button>
    </form>
  )
}

function TripSummary({ trip, totalEstimatedCost, remainingBudget, budgetStatus, className = '' }) {
  return (
    <section className={`trip-summary ${className}`.trim()}>
      <div className="summary-header">
        <p className="eyebrow">Trip overview</p>
        <h2>{trip.destination}</h2>
      </div>

      <div className="summary-grid">
        <div className="summary-item">
          <span className="label">Start date</span>
          <strong>{formatDate(trip.startDate)}</strong>
        </div>

        <div className="summary-item">
          <span className="label">End date</span>
          <strong>{formatDate(trip.endDate)}</strong>
        </div>

        <div className="summary-item">
          <span className="label">Budget</span>
          <strong>{formatCurrency(trip.budget)}</strong>
        </div>

        <div className="summary-item">
          <span className="label">Estimated cost</span>
          <strong>{formatCurrency(totalEstimatedCost)}</strong>
        </div>

        <div className="summary-item">
          <span className="label">Remaining budget</span>
          <strong>{formatCurrency(remainingBudget)}</strong>
        </div>

        <div className="summary-item status-item">
          <span className="label">Budget status</span>
          <strong className={`status-badge ${budgetStatus.toLowerCase().replace(/\s+/g, '-')}`}>
            {budgetStatus}
          </strong>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [formData, setFormData] = useState(emptyForm)
  const [trip, setTrip] = useState(null)
  const [error, setError] = useState('')
  const [tripDays, setTripDays] = useState([])
  const [selectedDayId, setSelectedDayId] = useState('')
  const [activitiesByDay, setActivitiesByDay] = useState({})
  const [activityForm, setActivityForm] = useState(emptyActivity)
  const [editingActivityId, setEditingActivityId] = useState(null)
  const [editingDayId, setEditingDayId] = useState(null)
  const [activityError, setActivityError] = useState('')

  const totalEstimatedCost = useMemo(() => {
    if (!tripDays.length) return 0

    return tripDays.reduce((total, day) => {
      const dayActivities = activitiesByDay[day.id] || []
      return (
        total +
        dayActivities.reduce((dayTotal, activity) => {
          return dayTotal + Number(activity.cost || 0)
        }, 0)
      )
    }, 0)
  }, [activitiesByDay, tripDays])

  const remainingBudget = trip ? trip.budget - totalEstimatedCost : 0

  const budgetStatus = trip
    ? totalEstimatedCost > trip.budget
      ? 'Exceeded budget'
      : totalEstimatedCost === trip.budget
        ? 'Reached budget'
        : 'Within budget'
    : 'Within budget'

  const selectedDay = tripDays.find((day) => day.id === selectedDayId) || tripDays[0] || null
  const selectedDayActivities = selectedDay ? activitiesByDay[selectedDay.id] || [] : []
  const selectedDayTotal = selectedDay
    ? (activitiesByDay[selectedDay.id] || []).reduce((total, activity) => {
        return total + Number(activity.cost || 0)
      }, 0)
    : 0

  const itineraryDays = tripDays.map((day) => ({
    ...day,
    activities: activitiesByDay[day.id] || [],
    total: (activitiesByDay[day.id] || []).reduce((total, activity) => {
      return total + Number(activity.cost || 0)
    }, 0),
  }))

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))

    if (error) {
      setError('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationMessage = validateTripSetup(formData)
    if (validationMessage) {
      setError(validationMessage)
      return
    }

    const destination = formData.destination.trim()
    const startDate = formData.startDate
    const endDate = formData.endDate
    const budget = Number(formData.budget)

    const days = getTripDays(startDate, endDate)
    if (!days.length) {
      setError('Please choose a valid trip date range.')
      return
    }

    setTrip({ destination, startDate, endDate, budget })
    setTripDays(days)
    setSelectedDayId(days[0]?.id || '')
    setActivitiesByDay({})
    setActivityForm(emptyActivity)
    setEditingActivityId(null)
    setEditingDayId(null)
    setActivityError('')
    setError('')
  }

  const handleReset = () => {
    setTrip(null)
    setFormData(emptyForm)
    setTripDays([])
    setSelectedDayId('')
    setActivitiesByDay({})
    setActivityForm(emptyActivity)
    setEditingActivityId(null)
    setEditingDayId(null)
    setActivityError('')
    setError('')
  }

  const handleActivityFormChange = (event) => {
    const { name, value } = event.target
    setActivityForm((current) => ({ ...current, [name]: value }))

    if (activityError) {
      setActivityError('')
    }
  }

  const handleActivitySubmit = (event) => {
    event.preventDefault()

    const targetDayId = editingDayId || selectedDay?.id

    if (!targetDayId) {
      return
    }

    const validationMessage = validateActivity(activityForm)
    if (validationMessage) {
      setActivityError(validationMessage)
      return
    }

    const trimmedName = activityForm.name.trim()
    const costValue = Number(activityForm.cost)

    const nextActivity = {
      id: editingActivityId || `${targetDayId}-${Date.now()}`,
      name: trimmedName,
      cost: costValue,
      notes: activityForm.notes.trim(),
    }

    setActivitiesByDay((current) => {
      const currentDayActivities = current[targetDayId] || []

      const updatedActivities = editingActivityId
        ? currentDayActivities.map((activity) =>
            activity.id === editingActivityId ? nextActivity : activity,
          )
        : [...currentDayActivities, nextActivity]

      return {
        ...current,
        [targetDayId]: updatedActivities,
      }
    })

    setActivityForm(emptyActivity)
    setEditingActivityId(null)
    setEditingDayId(null)
    setActivityError('')
  }

  const handleEditActivity = (activity) => {
    setEditingActivityId(activity.id)
    setEditingDayId(selectedDay?.id || null)
    setActivityForm({
      name: activity.name,
      cost: String(activity.cost),
      notes: activity.notes || '',
    })
    setActivityError('')
  }

  const handleCancelEdit = () => {
    setEditingActivityId(null)
    setEditingDayId(null)
    setActivityForm(emptyActivity)
    setActivityError('')
  }

  const handleDeleteActivity = (activityId) => {
    if (!selectedDay) return

    setActivitiesByDay((current) => ({
      ...current,
      [selectedDay.id]: (current[selectedDay.id] || []).filter(
        (activity) => activity.id !== activityId,
      ),
    }))

    if (editingActivityId === activityId) {
      setEditingActivityId(null)
      setEditingDayId(null)
      setActivityForm(emptyActivity)
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo" aria-hidden="true">
            TF
          </div>
          <div className="app-header-copy">
            <strong>TripFlow</strong>
            <span>Travel planning made simple</span>
          </div>
        </div>
        <h1>Plan smarter trips</h1>
      </header>

      {!trip ? (
        <TripForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
      ) : (
        <>
          <TripSummary
            trip={trip}
            totalEstimatedCost={totalEstimatedCost}
            remainingBudget={remainingBudget}
            budgetStatus={budgetStatus}
          />

          <section className="planner-panel">
            <div className="planner-header">
              <h2>Trip planner</h2>
            </div>

            <div className="day-tabs" aria-label="Trip day navigation">
              {tripDays.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  className={`day-tab ${selectedDay?.id === day.id ? 'active' : ''}`}
                  onClick={() => {
                    if (editingActivityId) {
                      handleCancelEdit()
                    }
                    setSelectedDayId(day.id)
                  }}
                >
                  Day {day.dayNumber}
                </button>
              ))}
            </div>

            {selectedDay && (
              <div className="day-content">
                <div className="day-header-row">
                  <div>
                    <p className="eyebrow">Selected day</p>
                    <h3>
                      Day {selectedDay.dayNumber} — {selectedDay.label}
                    </h3>
                  </div>

                  <div className="day-total-box">
                    <span>Estimated cost</span>
                    <strong>{formatCurrency(selectedDayTotal)}</strong>
                  </div>
                </div>

                <form className="activity-form" onSubmit={handleActivitySubmit}>
                  <div className="field-group">
                    <label htmlFor="activity-name">Activity name</label>
                    <input
                      id="activity-name"
                      name="name"
                      type="text"
                      value={activityForm.name}
                      onChange={handleActivityFormChange}
                      placeholder="e.g. Beach tour"
                    />
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label htmlFor="activity-cost">Estimated cost</label>
                      <input
                        id="activity-cost"
                        name="cost"
                        type="number"
                        min="0"
                        step="10"
                        value={activityForm.cost}
                        onChange={handleActivityFormChange}
                        placeholder="0"
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="activity-notes">Notes</label>
                      <input
                        id="activity-notes"
                        name="notes"
                        type="text"
                        value={activityForm.notes}
                        onChange={handleActivityFormChange}
                        placeholder="Optional notes"
                      />
                    </div>
                  </div>

                  {activityError && <p className="form-error">{activityError}</p>}

                  <div className="activity-form-actions">
                    <button type="submit" className="primary-button small-button">
                      {editingActivityId ? 'Save changes' : 'Add activity'}
                    </button>

                    {editingActivityId && (
                      <button
                        type="button"
                        className="secondary-button small-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <div className="activities-section">
                  <h3>Activities</h3>

                  {(selectedDayActivities || []).length === 0 ? (
                    <p className="empty-state">No activities planned yet.</p>
                  ) : (
                    <div className="activity-list">
                      {selectedDayActivities.map((activity) => (
                        <article key={activity.id} className="activity-card">
                          <div className="activity-header">
                            <h4>{activity.name}</h4>
                            <span className="activity-cost">{formatCurrency(activity.cost)}</span>
                          </div>

                          {activity.notes && <p className="activity-notes">{activity.notes}</p>}

                          <div className="activity-actions">
                            <button
                              type="button"
                              className="secondary-button small-button"
                              onClick={() => handleEditActivity(activity)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="delete-button small-button"
                              onClick={() => handleDeleteActivity(activity.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="itinerary-panel">
            <div className="itinerary-header">
              <div>
                <p className="eyebrow">Final itinerary</p>
                <h2>{trip.destination}</h2>
              </div>

              <button
                type="button"
                className="primary-button print-button no-print"
                onClick={() => window.print()}
              >
                Print Itinerary
              </button>
            </div>

            <TripSummary
              trip={trip}
              totalEstimatedCost={totalEstimatedCost}
              remainingBudget={remainingBudget}
              budgetStatus={budgetStatus}
              className="print-summary"
            />

            <div className="itinerary-days">
              {itineraryDays.map((day) => (
                <article key={day.id} className="itinerary-day">
                  <div className="itinerary-day-header">
                    <div>
                      <p className="eyebrow">Day {day.dayNumber}</p>
                      <h3>{day.label}</h3>
                    </div>

                    <div className="day-total-box">
                      <span>Day total</span>
                      <strong>{formatCurrency(day.total)}</strong>
                    </div>
                  </div>

                  {day.activities.length === 0 ? (
                    <p className="empty-state itinerary-empty">No activities planned yet.</p>
                  ) : (
                    <ul className="itinerary-activity-list">
                      {day.activities.map((activity) => (
                        <li key={activity.id} className="itinerary-activity-item">
                          <div className="itinerary-activity-main">
                            <strong>{activity.name}</strong>
                            <span>{formatCurrency(activity.cost)}</span>
                          </div>

                          {activity.notes && <p className="itinerary-notes">{activity.notes}</p>}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          <button type="button" className="secondary-button secondary-reset no-print" onClick={handleReset}>
            Plan another trip
          </button>
        </>
      )}
    </main>
  )
}

export default App
