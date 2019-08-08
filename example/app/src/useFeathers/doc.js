/**
 * useRealtime
 * useFind
 * useGet
 * useCreate
 * usePatch
 * useUpdate
 * useRemove
 * useAuthenticate
 * useAuthenticated
 */

const [users, loading, error] = useFind("users", query);
const [{ data, total, limit, skip }, loading, error, fetchMore] = useFind(
  "users",
  { query },
  { paginate: true }
);

///
const [fetchUsers, users, loading, error] = useFind(() => 'users');
fetchUsers(query);



const [user, loading, error] = useGet("users", ":id", query);
///
const [getUser, user, loading, error] = useGet(() => 'users');
getUser(id, query);



const [user, loading, error] = useCreate("users", data, query);
///
const [createUser, user, loading, error] = useCreate(() => 'users');
createUser(data, query);



const [user, loading, error] = usePatch("users", id, data, query);
///
const [patchUser, user, loading, error] = usePatch(() => 'users');
patchUser(id, data, query);



const [user, loading, error] = useUpdate("users", id, data, query);
///
const [updateUser, user, loading, error] = useUpdate(() => 'users');
updateUser(id, data, query);



const [user, loading, error] = useRemove("users", id, query);
///
const [removeUser, user, loading, error] = usePatch(() => 'users');
removeUser(id, query);


useRealtime('users', 'created', user => {
	// return remove listener event
	return () => {};
});