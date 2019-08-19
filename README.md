# useFeathers

⚓️ React Hooks + FeathersJS = useFeathers. Increase productivity in building small and medium applications. 🚀

### Hooks

- [x] useFeathers
- [x] useFind
- [x] useGet
- [x] useCreate
- [x] usePatch
- [x] useUpdate
- [x] useRemove
- [x] useRealtime
- [x] useAuthenticate
- [x] useLogout
- [x] useAuthenticationEvents

### Additional features

- [x] Paginate
- [x] Realtime
- [ ] Realtime deep populate
- [ ] Custom filter realtime
- [ ] Cache

### Install

Use yarn
```shell
yarn add useFeathers
```

or use npm
```shell
npm i useFeathers --save 
```

### Demo



### Example
#### useFeathers

Set instante feathers client for initilalization hooks.

```javascript
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import useFeathers from 'useFeathers';

const URL = 'http://localhost:3030';

const socket = io(URL);
const feathers = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage
  }));

useFeathers(feathers);
```

#### useFind

```javascript
import { useFind } from 'useFeathers';

const [users, loading, error] = useFind('users', query);
// OR
const [fetchUsers, users, loading, error] = useFind(() => 'users');
const response = await fetchUsers(query); // return Promise;
// OR
const options = { paginate: true }; // optional
const [{ data }, loading, error, fetchMore] = useFind('users', query, options);
// OR
const options = { paginate: true }; // optional
const [fetchUsers, users, loading, error, fetchMore] = useFind(() => 'users', options);
```

```javascript
const options = {
	paginate: true || false,
	realtime: true || false // watch events created, patched, updated, removed, and automatically make the changes 
};
```

####  useGet

```javascript
import { useGet } from 'useFeathers';

const options = { realtime: true }; // optional
const [user, loading, error] = useGet('users', id, query, options);
// OR
const [getUser, user, loading, error] = useGet(() => 'users', options);
const response = await getUser(id, query); // return Promise
```

```javascript
const options = {
	realtime: true || false
};
```

#### useCreate

```javascript
import { useCreate } from 'useFeathers';

const [user, loading, error] = useCreate('users', {
	name: 'foo',
	email: 'foo@mail.com'
}, query);
// OR
const [createUser, user, loading, error] = useCreate(() => 'users');
const response = await createUsers(data, query); // return Promise

// query optional
```

#### usePatch

```javascript
import { usePatch } from 'useFeathers';

const [user, loading, error] = usePatch('users', id, {
	name: 'foo',
	email: 'foo@mail.com'
}, query);
// OR
const [patchUser, user, loading, error] = usePatch(() => 'users');
const response = await patchUser(id, data, query); // return Promise

// query optional
```

#### useUpdate

```javascript
import { useUpdate } from 'useFeathers';

const [user, loading, error] = useUpdate('users', id, {
	name: 'foo',
	email: 'foo@mail.com'
}, query);
// OR
const [updateUser, user, loading, error] = useUpdate(() => 'users');
const response = await updateUser(id, data, query); // return Promise

// query optional
```

#### useRemove

```javascript
import { useRemove } from 'useFeathers';

const [user, loading, error] = useRemove('users', id, query);
// OR
const [removeUser, user, loading, error] = useRemove(() => 'users');
const response = await removeUser(id, query); // return Promise

// query optional
```

#### useRealtime

```javascript
import { useRealtime } from 'useFeathers';

// events "created", "patched", "updated", "removed"

const [userCreated] = useRealtime('users', 'created');
// OR
const [userCreated] = useRealtime('users', 'created', (userCreated) => {
	console.log('created => ', userCreated);
});
```

#### useAuthenticate / useLogout / useAuthenticationEvents

```javascript
import { useAuthenticate, useLogout, useAuthenticationEvents } from 'useFeathers';

const [authenticate, dataAuth, authenticated, loading, error] = useAuthenticate();
const [logout] = useLogout();
const response = useAuthenticationEvents('authenticated', (...args) => {
	console.log('event authenticated => ', args);
});

// events "authenticated", "logout", "reauthentication-error"
```


### License
