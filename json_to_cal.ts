export {}

const res = await fetch("http://www.piletilevi.ee/api/?preset=kultrakvere&language=est");
const body = await res.json();
const categories = body.responseData.category;
const shows = body.responseData.show;
const events = body.responseData.concert;
const promoters = body.responseData.promoter;
const venues = body.responseData.venue;
const results = [];
for (const e in events) {
    const event = events[e]
    event.venue=venues.find(v => v.id === events[e].venueId)
    event.show=shows.find(s => s.id === events[e].showId)
    event.show.categories.map(id => {
        return categories.find(c => c.id === id)
    })
    event.promoter=promoters.find(p => p.id === events[e].promoterId)
    results.push(event)
}
await Deno.writeTextFile("./piletilevi.json", JSON.stringify({events:results}));
