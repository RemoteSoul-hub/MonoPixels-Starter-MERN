export default function Home() {
    const submitForm = async (e) => {
      e.preventDefault();
      const text = e.target.text.value;
      await fetch('http://localhost:3001/api/scrapperRoute', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });
    };
  
    return (
      <form onSubmit={submitForm}>
        <input type="text" name="text" required />
        <button type="submit">Submit</button>
      </form>
    );
  }
  