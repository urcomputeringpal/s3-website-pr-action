import filePathToS3Key from '../filePathToS3Key';

describe('filePathToS3Key', () => {
  test('should return correct S3 key for root object', () => {
    expect(filePathToS3Key('index.html')).toBe('index.html');
  });

  test('should return correct S3 key for root object with leading /', () => {
    expect(filePathToS3Key('/index.html')).toBe('index.html');
  });

  test('should return correct S3 key for root object with leading \\', () => {
    expect(filePathToS3Key('\\index.html')).toBe('index.html');
  });

  test('should return correct S3 key for nested object with /', () => {
    expect(filePathToS3Key('test/index.html')).toBe('test/index.html');
  });

  test('should return correct S3 key for nested object with \\', () => {
    expect(filePathToS3Key('test\\index.html')).toBe('test/index.html');
  });

  test('should return correct S3 key for nested object with /', () => {
    expect(filePathToS3Key('myfolder/test/index.html')).toBe(
      'myfolder/test/index.html'
    );
  });

  test('should return correct S3 key for nested object with \\', () => {
    expect(filePathToS3Key('myfolder\\test\\index.html')).toBe(
      'myfolder/test/index.html'
    );
  });
});
