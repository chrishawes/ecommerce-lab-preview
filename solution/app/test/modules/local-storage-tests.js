/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// jshint esversion: 6
import LocalStorage from 'local-storage';
import {LineItem} from 'cart';
import {products} from 'products';

const key = 'ls-test';

QUnit.module('Local storage', {beforeEach: () => {
  window.localStorage.removeItem(key);
}});

QUnit.test('writes to local storage on save', assert => {
  const items = _makeItemList();
  const storage = new LocalStorage(key);
  storage.save(items);
  assert.ok(window.localStorage.getItem(key), 'saved');
});

QUnit.test('reads saved values', assert => {
  const items = _makeItemList();
  const writer = new LocalStorage(key);
  writer.save(items);
  // Now read into a new instance and compare
  const reader = new LocalStorage(key);
  const readItems = reader.load();
  assert.deepEqual(readItems, items, 'recovered');
});

function _makeItemList() {
  const shop = products.slice(0, 3);
  return shop.map((item, index) => {
    let li = new LineItem(item, index + 1);
    return li.savedValue;
  });
}